const axios = require('axios');
const cron = require('node-cron');
const ShiftReminder = require('../../schemas/shiftreminder');

const CHANNEL_ID = '1419983174838255719';
const API_URL = 'https://api.rbxserendipity.com/api/shift';
const REMINDER_WINDOW_MINUTES = 10;
const FETCH_TIMEOUT_MS = 10_000;
const CRON_EXPR = '*/5 * * * *';

module.exports = async (client) => {
  let channel;
  try {
    channel = await client.channels.fetch(CHANNEL_ID);
    if (!channel || !channel.isTextBased()) return;
    if (channel.guild && !channel.permissionsFor?.(channel.guild.members.me)?.has('SendMessages')) return;
  } catch {
    return;
  }

  const notified = new Map();
  const NOTIFY_TTL_MS = 24 * 60 * 60 * 1000;
  const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  let running = false;

  function parseShiftTime(t) {
    if (typeof t !== 'string') return new Date(NaN);
    const hasTZ = /[zZ]|[+\-]\d{2}:?\d{2}$/.test(t);
    return new Date(hasTZ ? t : `${t}Z`);
  }

  function gcNotified(nowMs) {
    for (const [id, exp] of notified) {
      if (nowMs >= exp) notified.delete(id);
    }
  }

  async function tick() {
    if (running) return;
    running = true;
    const startedAt = Date.now();

    try {
      const { data } = await axios.get(API_URL, { timeout: FETCH_TIMEOUT_MS });
      if (!Array.isArray(data) || data.length === 0) return;

      const now = new Date();
      const nowMs = now.getTime();
      const windowEndMs = nowMs + REMINDER_WINDOW_MINUTES * 60 * 1000;
      gcNotified(nowMs);

      const upcoming = data
        .map((s) => ({ ...s, _start: parseShiftTime(s.startTime) }))
        .filter((s) => !Number.isNaN(s._start.getTime()))
        .filter((s) => {
          const startMs = s._start.getTime();
          return startMs >= nowMs && startMs <= windowEndMs;
        });

      if (upcoming.length === 0) return;
      const fresh = upcoming.filter((s) => !notified.has(s.id));
      if (fresh.length === 0) return;

      const usernames = [...new Set(fresh.map((s) => s.userId).filter(Boolean))];
      let toDiscord = new Map();

      if (usernames.length) {
        try {
          const regexes = usernames.map((u) => new RegExp(`^${escapeRegExp(String(u))}$`, 'i'));
          const rows = await ShiftReminder.find(
            { robloxusername: { $in: regexes } },
            { robloxusername: 1, discordid: 1, _id: 0 }
          ).lean();

          toDiscord = new Map(
            rows.map((r) => [(r.robloxusername || '').toLowerCase(), r.discordid || null])
          );
        } catch {}
      }

      for (const shift of fresh) {
        const roblox = shift.userId || 'Unknown';
        const key = String(roblox).toLowerCase();
        const discordId = toDiscord.get(key) || null;
        const minutes = Math.max(
          0,
          Math.ceil((parseShiftTime(shift.startTime).getTime() - nowMs) / 60000)
        );
        const content = `${
          discordId ? `<@${discordId}>` : `**${roblox}**`
        } your shift is scheduled to begin in ${minutes} minute${minutes === 1 ? '' : 's'}!`;

        try {
          await channel.send({ content });
          notified.set(shift.id, nowMs + NOTIFY_TTL_MS);
        } catch {}
      }
    } catch {} finally {
      running = false;
      const dur = Date.now() - startedAt;
      if (dur > 5000) console.warn('[shift-reminder] tick duration:', dur, 'ms');
    }
  }

  try {
    await tick();
  } catch {}
  cron.schedule(CRON_EXPR, tick, { timezone: 'Etc/UTC' });
};
