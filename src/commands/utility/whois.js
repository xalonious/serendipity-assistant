const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
const noblox = require("noblox.js")
require("dotenv").config()


module.exports = {
    name: "whois",
    description: "shows information about a roblox user",
    options: [
        {
            name: "user",
            description: "the roblox user to get info for",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async(client, interaction) => {
        await interaction.deferReply();
        
        const robloxuser = interaction.options.getString("user")

        try {
            const userId = await noblox.getIdFromUsername(robloxuser)
            if(userId == null) {
                return interaction.editReply({
                    content: "The specified username does not exist",
                    ephemeral: true
                })
            }

            const [avatarImage, groupRank, userInfo, friendCount, followerCount, followingCount, usernameHistory] = await Promise.all([
                getUserAvatar(userId),
                noblox.getRankNameInGroup(4346739, userId),
                noblox.getUserInfo(userId),
                noblox.getFriendCount(userId),
                noblox.getFollowerCount(userId),
                noblox.getFollowingCount(userId),
                noblox.getUsernameHistory({ userId, limit: 10, sortOrder: "Asc" }).catch(() => [])
            ])


            const pastUsernames = Array.isArray(usernameHistory) && usernameHistory.length > 0
                ? usernameHistory.map(entry => entry.name)
                : []

            const infoEmbed = new EmbedBuilder()
            .setTitle(`Info for ${userInfo.name}`)
            .setThumbnail(avatarImage)
            .addFields(
                {name: "Display name", value: userInfo.displayName, inline: true},
                {name: "Username", value: userInfo.name, inline: true},
                {name: "User ID", value: `${userId}`, inline: true},
                {name: "Join date", value: userInfo.created.toDateString(), inline: true},
                {name: "Past usernames", value: pastUsernames.length ? pastUsernames.join("\n") : "None", inline: true},
                {name: "Rank in group", value: groupRank, inline: true},
                {name: "Friends", value: friendCount.toString(), inline: true},
                {name: "Followers", value: followerCount.toString(), inline: true},
                {name: "Following", value: followingCount.toString(), inline: true}
            )
            .setColor("Random")

            await interaction.editReply({embeds: [infoEmbed]})
        } catch (error) {
            

            if (error.message && error.message.includes("Too many requests")) {
                return interaction.editReply({
                    content: "⏱️ We're being rate limited by Roblox! Please wait a moment and try again.",
                    ephemeral: true
                })
            }
            
            if (error.statusCode === 429 || (error.errors && error.errors.some(e => e.code === 0))) {
                return interaction.editReply({
                    content: "⏱️ We're being rate limited by Roblox! Please wait a moment and try again.",
                    ephemeral: true
                })
            }

            console.error("Error fetching user info:", error)
            
            return interaction.editReply({
                content: "An error occurred while fetching user information. Please try again later.",
                ephemeral: true
            })
        }
    }
}




async function getUserAvatar (userId) {
    const avatarObject = await noblox.getPlayerThumbnail(userId, 420, "png", false)
    const avatar = avatarObject[0].imageUrl
    if(avatar === "https://noblox.js.org/moderatedThumbnails/moderatedThumbnail_420x420.png") {
        return "https://img.favpng.com/0/16/15/woman-question-mark-female-png-favpng-JRuwedyFNNkcVvpqzN1dGbTEw.jpg"
    }
    return avatar;
}