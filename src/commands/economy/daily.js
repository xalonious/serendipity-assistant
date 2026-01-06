const economySchema = require("../../schemas/economy");
const { CURRENCY } = require("../../utils/replies");

module.exports = {
    name: "daily",
    description: "Claim your daily coins",
    requiresAccount: true,

    run: async (client, interaction) => {


        await interaction.deferReply();

        const user = await economySchema.findOne({ userId: interaction.user.id });

        if (user.daily.hasClaimedDaily) {
            return interaction.editReply(`you already claimed your daily coins today, stop being so damn greedy... you can claim them at midnight UTC`);
        }

        let dailyAmount;

        if (user.daily.streak === 1) {
            dailyAmount = 1000;
        } else {
            dailyAmount = 1000 + (user.daily.streak - 1) * 200;
        }

        user.walletbalance += dailyAmount;
        user.daily.hasClaimedDaily = true;

        let replyMessage = `${CURRENCY} You have claimed your daily **__${dailyAmount} coins__**!`;
        if (user.daily.streak > 1) {
            replyMessage += `\nStreak: ${user.daily.streak} days`;
        }

        await user.save();

        await interaction.editReply(replyMessage);
    }
}