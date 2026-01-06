const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const economySchema = require("../../schemas/economy");
const { CURRENCY } = require("../../utils/replies");

const diceEmojis = [
    "<:dice_1:1371147185709908060>",
    "<:dice_2:1371147187886755921>",
    "<:dice_3:1371147189560016936>",
    "<:dice_4:1371147191103782973>",
    "<:dice_5:1371147193104203969>",
    "<:dice_6:1371147194861617324>"
];

module.exports = {
    name: "snakeeyes",
    description: "Play the snake eyes game",
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

        if (amount < 250) {
            return interaction.editReply("You need to bet at least 250 coins to play snake eyes");
        }

        if (amount > existingUser.walletbalance) {
            return interaction.editReply(`You don't have that much money! You only have ${existingUser.walletbalance} coins`);
        }

        let dice = [];
        const spinningIterations = 4; 

        let snakeEyesEmbed = new EmbedBuilder()
            .setTitle("Snake Eyes")
            .setDescription("Rolling...")
            .setColor("#FFFFFF")
            .setThumbnail("https://cdn-icons-png.flaticon.com/512/229/229800.png");
        
        let spinningMessage = await interaction.editReply({ content: "", embeds: [snakeEyesEmbed] });

        for (let j = 0; j < spinningIterations; j++) {
            for (let i = 0; i < 2; i++) {
                dice[i] = Math.floor(Math.random() * diceEmojis.length);
            }

            snakeEyesEmbed.setDescription(`${diceEmojis[dice[0]]} | ${diceEmojis[dice[1]]}\n\nRolling...`);
            spinningMessage = await spinningMessage.edit({ content: "", embeds: [snakeEyesEmbed] });

            await new Promise(resolve => setTimeout(resolve, 1000)); 
        }

        let win = false;
        if (dice[0] == 0 && dice[1] == 0) {
            amount *= 5;
            win = true;
        } else if (dice[0] == 0 || dice[1] == 0) {
            amount *= 2;
            win = true;
        }

        if (win) {
            const winnings = amount - bet;
            snakeEyesEmbed.setDescription(`${diceEmojis[dice[0]]} | ${diceEmojis[dice[1]]}\n\n${CURRENCY} **You won ${winnings} coins!**`);
            snakeEyesEmbed.setColor("Green");
            await interaction.editReply({ embeds: [snakeEyesEmbed] });
            await economySchema.findOneAndUpdate({ userId: interaction.user.id }, {
                $inc: {
                    walletbalance: winnings
                }
            });
        } else {
            snakeEyesEmbed.setDescription(`${diceEmojis[dice[0]]} | ${diceEmojis[dice[1]]}\n\n${CURRENCY} **You lost ${amount} coins!**`);
            snakeEyesEmbed.setColor("Red");
            await interaction.editReply({ embeds: [snakeEyesEmbed] });
            await economySchema.findOneAndUpdate({ userId: interaction.user.id }, {
                $inc: {
                    walletbalance: -amount
                }
            });
        }


        interaction.shouldApplyCooldown = true;
    }
}