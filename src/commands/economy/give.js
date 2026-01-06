const economySchema = require("../../schemas/economy");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "give",
    description: "Give someone some money",
    usage: "<user> <amount>",
    requiresAccount: true,
    options: [
        {
            name: "user",
            description: "The user you want to give money to",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "amount",
            description: "The amount of money you want to give",
            type: ApplicationCommandOptionType.Integer,
            required: true
        }
    ],

    run: async(client, interaction) => {
    
            await interaction.deferReply();
    
            const user = interaction.options.getUser("user");
            const amount = interaction.options.getInteger("amount");

            if(user.id == interaction.user.id) return interaction.editReply("You can't give money to yourself... that's just sad");
    
    

            if(amount < 1) return interaction.editReply("Please enter a valid amount of money to give");
    
            const existingUser = await economySchema.findOne({ userId: interaction.user.id });
            const targetUser = await economySchema.findOne({ userId: user.id });
    
            if(!targetUser) return interaction.editReply("That user doesn't have an account yet");
    
            if(existingUser.walletbalance < amount) return interaction.editReply("You don't have that much money! You only have " + existingUser.walletbalance + " coins");
    
            await economySchema.findOneAndUpdate({ userId: interaction.user.id }, {
                $inc: {
                    walletbalance: -amount
                }
            });
    
            await economySchema.findOneAndUpdate({ userId: user.id }, {
                $inc: {
                    walletbalance: amount
                }
            });
    
            await interaction.editReply(`Successfully gave ${amount} coins to ${user.username}`);
    }
}