const { ApplicationCommandOptionType } = require("discord.js");
const { Connect4 } = require("discord-gamecord");

module.exports = {
    name: "connect4",
    description: "Play a game of Connect Four with another user!",
    usage: "<user>",
    options: [
        {
            name: "user",
            description: "The user you want to play with",
            type: ApplicationCommandOptionType.User,
            required: true,
        }
    ],

    run: async (client, interaction) => {
        await interaction.deferReply();

        const challenger = interaction.user;
        const opponent = interaction.options.getUser("user");

        if (opponent.bot) {
            return interaction.editReply("❌ You can't play against bots.");
        }
        if (opponent.id === challenger.id) {
            return interaction.editReply("❌ You can't play against yourself.");
        }

        await interaction.channel.send({
            content: `${opponent}, you've been challenged to a game of **Connect Four** by ${challenger}!`,
        });

        const Game = new Connect4({
            message: interaction,
            isSlashGame: true,
            opponent,
            embed: {
                title: "Connect Four",
                statusTitle: "Game Status",
                color: "#f54269"
            },
            emojis: {
                board: "⚪",
                player1: "🔴",
                player2: "🟡"
            },
            timeoutTime: 120000,
            turnMessage: "{emoji} | It's **{player}**'s turn!",
            winMessage: "{emoji} | **{player}** won the game!",
            tieMessage: "It's a tie!",
            timeoutMessage: "Game ended due to inactivity!",
            playerOnlyMessage: "Only {player} and {opponent} can use these buttons."
        });

        await Game.startGame();
    }
};
