require("dotenv").config();
const axios = require('axios');

async function getRobloxIdFromDiscordId(discordId) {
    try {
        const url = `https://api.blox.link/v4/public/guilds/${process.env.SERVER_ID}/discord-to-roblox/${discordId}`;
        const res = await axios.get(url, {
            headers: {
                'Authorization': process.env.BLOXLINK_API_KEY
            }
        });

        const robloxID = res.data?.robloxID;
        return robloxID || null;
    } catch (err) {
        console.error('Bloxlink lookup error:', err);
        return null;
    }
}


module.exports = { 
    getRobloxIdFromDiscordId
};