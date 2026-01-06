const axios = require("axios");

function formatCount(number) {
    if (number >= 1_000_000) {
        const value = Math.floor(number / 100_000) / 10; 
        return value.toString().replace(/\.0$/, '') + 'M';
    } else if (number >= 1_000) {
        const value = Math.floor(number / 100) / 10; 
        return value.toString().replace(/\.0$/, '') + 'k';
    } else {
        return number.toString();
    }
}


async function getMemberCount() {
    try {
        const response = await axios.get("https://groups.roblox.com/v1/groups/4346739");
        const membersCount = response.data.memberCount;
        return membersCount;
    } catch (error) {
        console.error("Error fetching member count:", error);
        return "Failed to fetch";
    }
}

async function getPlayerCount() {
    try {
        const response = await axios.get("https://games.roblox.com/v1/games/2205456710/servers/Public?sortOrder=Asc");
        const servers = response.data.data || [];
        const totalPlayers = servers.reduce((total, server) => total + server.playing, 0);
        return totalPlayers;
    } catch (error) {
        console.error("Failed to fetch player count:", error);
        return "Failed to fetch";
    }
}

module.exports = {
    getMemberCount,
    getPlayerCount,
    formatCount
};
