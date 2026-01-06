const economySchema = require("../../schemas/economy");
const { EmbedBuilder } = require("discord.js");
const { CURRENCY } = require("../../utils/replies");

module.exports = {
    name: "economylb",
    description: "Displays the economy leaderboard",

    run: async(client, interaction) => {
            
            await interaction.deferReply();
    
            const allUsers = await economySchema.aggregate([
                {
                    $addFields: {
                        totalbalance: { $add: ["$walletbalance", "$bankbalance"] }
                    }
                },
                {
                    $sort: { totalbalance: -1 }
                },
                {
                    $limit: 10
                }
            ]);
    
            const leaderboardEmbed = new EmbedBuilder()
            .setTitle("Economy Leaderboard Top 10")
            .setColor("Blurple")
            .setDescription(
                allUsers.map((user, index) => {
                    return `**${index + 1}.** <@${user.userId}> - ${CURRENCY} ${user.totalbalance} | <:wallet:1371147238192975933> ${user.walletbalance} :bank: ${user.bankbalance}`
                }).join("\n")
            )
            .setThumbnail(client.user.displayAvatarURL())
    
            await interaction.editReply({ embeds: [leaderboardEmbed] });
    }
}