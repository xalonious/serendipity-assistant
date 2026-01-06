const economySchema = require("../../schemas/economy");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "dep",
    description: "deposit coins to your bank",
    usage: "<amount> <?all> <?max>",
    requiresAccount: true,
    options: [
        {
            name: "amount",
            description: "The amount of money you want to deposit",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async (client, interaction) => {
        await interaction.deferReply();

        let amount = interaction.options.getString("amount");
        const existingUser = await economySchema.findOne({ userId: interaction.user.id });

        if (isNaN(amount) && amount !== "all" && amount !== "max") {
            return interaction.editReply("Please enter a valid number or 'all' to deposit all your coins");
        }

        if (amount === "all") {
            amount = existingUser.walletbalance;
        } else if (amount === "max") {
            amount = existingUser.bankcapacity - existingUser.bankbalance;
            if (amount > existingUser.walletbalance) amount = existingUser.walletbalance;
        }

        amount = parseInt(amount);

        if (existingUser.bankbalance + amount > existingUser.bankcapacity) {
            return interaction.editReply(`You can't deposit that much money! Your bank capacity is ${existingUser.bankcapacity} coins and you already have ${existingUser.bankbalance} coins in your bank`);
        }

        if (amount < 1) {
            return interaction.editReply("You need to deposit at least 1 coin");
        }

        if (existingUser.walletbalance < amount) {
            return interaction.editReply(`You don't have that much money! You only have ${existingUser.walletbalance} coins`);
        }

        await economySchema.findOneAndUpdate(
            { userId: interaction.user.id },
            {
                $inc: {
                    walletbalance: -amount,
                    bankbalance: amount
                }
            }
        );

        await interaction.editReply(`Successfully deposited ${amount} coins to your bank`);
    }
};
