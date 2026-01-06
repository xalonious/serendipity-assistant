const economySchema = require("../../schemas/economy");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "with",
    description: "withdraw coins from your bank",
    usage: "<amount> <?all>",
    requiresAccount: true,
    options: [
        {
            name: "amount",
            description: "The amount of money you want to withdraw",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async(client, interaction) => {
            
                    await interaction.deferReply();
            
                    let amount = interaction.options.getString("amount");

                    const existingUser = await economySchema.findOne({ userId: interaction.user.id });
                    
                    if(isNaN(amount) && amount !== "all") {
                        return interaction.editReply("Please enter a valid number or 'all' to withdraw all your coins");
                    }

                    if(amount == "all") amount = existingUser.bankbalance;
                    amount = parseInt(amount);
        
                    if(amount < 1) return interaction.editReply("You need to withdraw at least 1 coin");
            
            
                    if(existingUser.bankbalance < amount) return interaction.editReply(`You don't have that much money! You only have ${existingUser.bankbalance} coins in your bank`);
        
                    await economySchema.findOneAndUpdate({ userId: interaction.user.id }, {
                        $inc: {
                            walletbalance: amount,
                            bankbalance: -amount
                        }
                    });
        
                    await interaction.editReply(`Successfully withdrew ${amount} coins from your bank`);
    }
}