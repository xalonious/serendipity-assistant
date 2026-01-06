const economySchema = require("../../schemas/economy");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "rob",
    description: "Try to rob someone for some coins",
    usage: "<user>",
    requiresAccount: true,
    cooldown: 120000,
    givesxp: true,
    options: [
        {
            name: "user",
            description: "The user you want to rob",
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
    
    run: async(client, interaction) => {

        await interaction.deferReply();

        const user = interaction.options.getUser("user");

        if(user.id == interaction.user.id) {
            return interaction.editReply("You can't rob yourself.. not how that works");
        }

        const existingUser = await economySchema.findOne({ userId: interaction.user.id });
        const targetUser = await economySchema.findOne({ userId: user.id });

        if(!targetUser) {
            return interaction.editReply("That user doesn't have an account yet");
        
        }

        if(existingUser.walletbalance < 250) {
            return interaction.editReply("You need at least 250 coins to rob someone");
        }

        if(targetUser.walletbalance < 500) {
            return interaction.editReply("That user doesn't have enough money to rob");
        }

        const lossAmountCam = Math.floor(existingUser.walletbalance * (Math.random() * 0.15));
        if(targetUser.inventory.find(i => i.itemName === "Teks security camera")) {
            interaction.editReply(`you walk up to ${user.username} only to realize they have a Teks Security Camera... it spotted you from miles away and called the cops... you paid ${lossAmountCam} coins for attempted robbery`);
            await economySchema.findOneAndUpdate({ userId: interaction.user.id }, { $inc: { walletbalance: -lossAmountCam } });
            await economySchema.findOneAndUpdate({ userId: user.id }, { $inc: { walletbalance: lossAmountCam } });
            interaction.shouldApplyCooldown = true;
            if (Math.random() < 0.4) {
                const cameraIndex = targetUser.inventory.findIndex(i => i.itemName === "Teks security camera");
                if (cameraIndex !== -1) {
                    if (targetUser.inventory[cameraIndex].quantity > 1) {
                        await economySchema.findOneAndUpdate({ userId: user.id }, { $inc: { "inventory.$[elem].quantity": -1 } }, { arrayFilters: [{ "elem.itemName": "Teks security camera" }] });
                    } else {
                       
                        await economySchema.findOneAndUpdate({ userId: user.id }, { $pull: { inventory: { itemName: "Teks security camera" } } });
                    }
                }
            }
            return;
        }

        const result = Math.random() < 0.2 ? "success" : "failure";

        if(result == "success") {
            const robAmount = Math.floor(Math.random() * (targetUser.walletbalance * 0.4)) + 1;

            await economySchema.findOneAndUpdate({ userId: interaction.user.id }, { $inc: { walletbalance: robAmount } });
            await economySchema.findOneAndUpdate({ userId: user.id }, { $inc: { walletbalance: -robAmount } });

            await interaction.editReply(`You stole **__${robAmount}__** coins from ${user.username}... hey thats illegal!`);

        } else {
            const lossAmount = Math.floor(existingUser.walletbalance * (Math.random() * 0.15));

            await economySchema.findOneAndUpdate({ userId: interaction.user.id }, { $inc: { walletbalance: -lossAmount } });
            await economySchema.findOneAndUpdate({ userId: user.id }, { $inc: { walletbalance: lossAmount } });

            await interaction.editReply(`You got caught... you paid **__${lossAmount}__** coins to ${user.username}... you're a criminal!`);
        }

        interaction.shouldApplyCooldown = true;

    }}