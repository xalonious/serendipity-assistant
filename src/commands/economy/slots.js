const slotItems = [
    ":watermelon:", ":apple:", ":slot_machine:", ":strawberry:", ":cherries:",
    ":lemon:", ":banana:", ":pineapple:", ":peach:", ":pear:", ":kiwi:", ":blueberries:",
];

const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const economySchema = require("../../schemas/economy");
const { CURRENCY } = require("../../utils/replies");

module.exports = {
    name: "slots",
    description: "Play the slot machine",
    usage: "<amount>",
    cooldown: 30000,
    requiresAccount: true,
    givesxp: true,
    options: [
        {
            name: "amount",
            description: "The amount of money you want to bet",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async (client, interaction) => {

        await interaction.deferReply();

        let amount = interaction.options.getString("amount");

        const existingUser = await economySchema.findOne({ userId: interaction.user.id });

        if (isNaN(amount) && amount !== "all") {
            return interaction.editReply("Please enter a valid number or 'all' to bet all your coins");
        }

        if (amount == "all") amount = existingUser.walletbalance;

        amount = parseInt(amount);
        const bet = amount;

        let win = false;

        if (amount < 250) {
            return interaction.editReply("You need to bet at least 250 coins to play slots");
        }

        if (amount > existingUser.walletbalance) {
            return interaction.editReply(`You don't have that much money! You only have ${existingUser.walletbalance} coins`);
        }

        let number = [];
        const spinningIterations = 4; 

        let spinningMessage = await interaction.editReply({ content: "Spinning...", embeds: [] });

        for (let j = 0; j < spinningIterations; j++) {
            for (let i = 0; i < 3; i++) {
                number[i] = Math.floor(Math.random() * slotItems.length);
            }

            let slotsEmbed = new EmbedBuilder()
                .setTitle("Slots")
                .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nSpinning...`)
                .setColor("#FFFFFF")
                .setThumbnail("https://png.pngtree.com/png-vector/20191113/ourlarge/pngtree-slot-machine-with-three-sevens-icon-flat-style-png-image_1977277.jpg");
            
            spinningMessage = await spinningMessage.edit({ content: "", embeds: [slotsEmbed] });

            await new Promise(resolve => setTimeout(resolve, 1000)); 
        }

        let slotsEmbed = new EmbedBuilder()
        .setTitle("Slots")
        .setColor("#FFFFFF")
        .setThumbnail("https://png.pngtree.com/png-vector/20191113/ourlarge/pngtree-slot-machine-with-three-sevens-icon-flat-style-png-image_1977277.jpg")
        

        if (number[0] == number[1] && number[1] == number[2]) {
            amount = Math.round(amount *= 9);
            win = true;
        } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
            amount = Math.round(amount *= 2.5);
            win = true;
        }

        if (win) {
            const winnings = amount - bet;
            slotsEmbed.setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\n${CURRENCY} **You won ${winnings} coins!**`);
            slotsEmbed.setColor("Green");
            await spinningMessage.edit({ embeds: [slotsEmbed] });
            await economySchema.findOneAndUpdate({ userId: interaction.user.id }, {
                $inc: {
                    walletbalance: winnings
                }
            });
        } else {
            slotsEmbed.setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\n${CURRENCY} **You lost ${amount} coins!**`);
            slotsEmbed.setColor("Red");
            await spinningMessage.edit({ embeds: [slotsEmbed] });
            await economySchema.findOneAndUpdate({ userId: interaction.user.id }, {
                $inc: {
                    walletbalance: -amount
                }
            });
        }

        interaction.shouldApplyCooldown = true;
    }
}