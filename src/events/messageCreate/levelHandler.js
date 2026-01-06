const levelSchema = require("../../schemas/level");
const { getXpNeeded } = require("../../utils/levelUtils");
const cooldown = new Map();

module.exports = async (client, message) => {
  if (message.author.bot || !message.guild) return;
  if (!message.channel.name.includes("chat")) return;

  const userId = message.author.id;
  const guild = message.guild;

  if (cooldown.has(userId)) return;
  cooldown.set(userId, true);
  setTimeout(() => cooldown.delete(userId), 60_000);

  const xpGain = Math.floor(Math.random() * 11) + 15;
  let user = await levelSchema.findOne({ userId });
  if (!user) {
    user = new levelSchema({ userId, xp: 0, level: 0, isTopUser: false });
  }

  user.xp += xpGain;
  let xpNeeded = getXpNeeded(user.level);
  let leveledUp = false;

  while (user.xp >= xpNeeded) {
    user.xp -= xpNeeded;
    user.level++;
    xpNeeded = getXpNeeded(user.level);
    leveledUp = true;
  }

  await user.save();

  if (leveledUp) {
    message.channel.send(
      `🎉 Great job <@${userId}>, you leveled up to **Level ${user.level}**!`
    );
  }

  const roleId = "1366899494280761408";
  const oldTop = await levelSchema.findOne({ isTopUser: true });
  const newTop = await levelSchema.findOne().sort({ level: -1, xp: -1 });

  if (!newTop || oldTop?.userId === newTop.userId) return;

  if (oldTop) {
    await levelSchema.updateOne(
      { userId: oldTop.userId },
      { $set: { isTopUser: false } }
    ).catch(console.error);

    try {
      const oldMember = await guild.members.fetch(oldTop.userId);
      if (oldMember.roles.cache.has(roleId)) {
        await oldMember.roles.remove(roleId);
      }
    } catch {}
  }

  await levelSchema.updateOne(
    { userId: newTop.userId },
    { $set: { isTopUser: true } }
  ).catch(console.error);

  try {
    const newMember = await guild.members.fetch(newTop.userId);
    if (!newMember.roles.cache.has(roleId)) {
      await newMember.roles.add(roleId);
    }
  } catch {}
};
