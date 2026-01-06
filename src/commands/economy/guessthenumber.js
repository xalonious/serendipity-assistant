const economySchema = require("../../schemas/economy");
const { ApplicationCommandOptionType } = require("discord.js");
 
module.exports = {
    name: "guessthenumber",
    description: "Guess the number to win some coins",
    usage: "<amount>",
    requiresAccount: true,
    givesxp: true,
    cooldown: 30000,
    options: [
        {
            name: "amount",
            description: "The amount of money you want to bet",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "guess",
            description: "Your guess (1-10)",
            type: ApplicationCommandOptionType.Integer,
            required: true,
            choices: [
                { name: "1", value: 1 },
                { name: "2", value: 2 },
                { name: "3", value: 3 },
                { name: "4", value: 4 },
                { name: "5", value: 5 },
                { name: "6", value: 6 },
                { name: "7", value: 7 },
                { name: "8", value: 8 },
                { name: "9", value: 9 },
                { name: "10", value: 10 }
            ]
        }
    ],

    
    run: async(client, interaction) => {
        await interaction.deferReply();

        let amount = interaction.options.getString("amount");
        const guess = interaction.options.getInteger("guess");

        const userDoc = await economySchema.findOne({ userId: interaction.user.id });

        if (isNaN(amount) && amount !== "all") {
            return interaction.editReply("Please enter a valid number or 'all'.");
        }
        if (amount === "all") amount = userDoc.walletbalance;
        amount = Number(amount);

        if (amount < 250) {
            return interaction.editReply("You need to bet at least 250 coins to play Guess the Number.");
        }
        if (userDoc.walletbalance < amount) {
            return interaction.editReply(`You don't have that much money! You only have ${userDoc.walletbalance} coins`);
        }

        const randomNumber = Math.floor(Math.random() * 10) + 1;


        if (guess === randomNumber) {
            await economySchema.findOneAndUpdate(
                { userId: interaction.user.id },
                { $inc: { walletbalance: amount * 8 } }
            );
            interaction.editReply(`Congratulations! You guessed the number **${randomNumber}** and won **${amount * 8}** coins!`);
        } else {
            await economySchema.findOneAndUpdate(
                { userId: interaction.user.id },
                { $inc: { walletbalance: -amount } }
            );

            interaction.editReply(`Sorry! The correct number was **${randomNumber}**. You lost **${amount}** coins.`);
        }

        interaction.shouldApplyCooldown = true;

    }
}