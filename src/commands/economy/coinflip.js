const economySchema = require("../../schemas/economy");
const { ApplicationCommandOptionType } = require("discord.js");
const { CURRENCY } = require("../../utils/replies");

module.exports = {
    name: "coinflip",
    description: "Flip a coin to double your money",
    usage: "<amount> <?side>",
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
            name: "side",
            description: "The side of the coin you want to bet on",
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "Heads",
                    value: "heads"
                },
                {
                    name: "Tails",
                    value: "tails"
                }
            ],
            required: true,
        }
    ],

    run: async(client, interaction) => {
        
                await interaction.deferReply();
        
                let amount = interaction.options.getString("amount");
                const side = interaction.options.getString("side");

                const existingUser = await economySchema.findOne({ userId: interaction.user.id });

                if(isNaN(amount) && amount !== "all") {
                    return interaction.editReply("Please enter a valid number or 'all' to bet all your coins");
                }
                if(amount == "all") amount = existingUser.walletbalance;

                amount = parseInt(amount);
    
                if(amount < 1) {
                    return interaction.editReply("You need to bet at least 1 coin to play coinflip");
                }
        
                
        
                if(existingUser.walletbalance < amount) {
                    return interaction.editReply(`You don't have that much money! You only have ${existingUser.walletbalance} coins`);
                }
        
                const result = Math.floor(Math.random() * 2) == 0 ? "heads" : "tails";
        
                if(result == side) {
                    await economySchema.findOneAndUpdate({ userId: interaction.user.id }, {
                        $inc: {
                            walletbalance: amount
                        }
                    });
        
                    await interaction.editReply(`${CURRENCY} You won! The coin landed on ${result}! You won **__${amount}__** coins!`);
                } else {
                    await economySchema.findOneAndUpdate({ userId: interaction.user.id }, {
                        $inc: {
                            walletbalance: -amount
                        }
                    });
        
                    await interaction.editReply(`${CURRENCY} You lost! The coin landed on ${result}! You lost **__${amount}__** coins!`);
                }

                interaction.shouldApplyCooldown = true;
    }
}