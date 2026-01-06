require("dotenv").config();
const { getMemberCount, getPlayerCount, formatCount } = require('../../utils/statsUtils');
const cron = require('node-cron');

module.exports = async (client) => {
    const guildId = process.env.SERVER_ID;

    const channelIds = {
        allMembers: "1366136649167274105",
        boosts: "1366136782084902912",
        players: "1366136817258336448",
        groupMembers: "1366451193164988536",

    };


    const guild = await client.guilds.fetch(guildId);

    cron.schedule('*/5 * * * *', async () => {
        try {
            const allMembers = formatCount(guild.memberCount);
            const boosts = guild.premiumSubscriptionCount || 0;
            const playerCount = await getPlayerCount();
            const groupMembers = formatCount(await getMemberCount());

            const updates = [
                { id: channelIds.allMembers, name: `👥 Server Members: ${allMembers}` },
                { id: channelIds.groupMembers, name: `👤 Group Members: ${groupMembers}` },
                { id: channelIds.boosts, name: `🚀 Boosts: ${boosts}` },
                { id: channelIds.players, name: `🎮 Players: ${playerCount}` },
            ];

            await Promise.all(
                updates.map(async ({ id, name }) => {
                    const channel = client.channels.cache.get(id);
                    if (channel) {
                        await channel.setName(name);
                    }
                })
            );
        } catch (error) {
            console.error("[Cron] Error updating stats:", error);
        }
    }, {
        timezone: "Europe/Brussels"
    });
};
