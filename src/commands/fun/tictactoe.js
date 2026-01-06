const { ApplicationCommandOptionType } = require("discord.js");
const { TicTacToe } = require("discord-gamecord");

module.exports = {
    name: "tictactoe",
    description: "Play a game of Tic Tac Toe with another user!",
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

        const opponent = interaction.options.getUser("user");


        if (opponent.bot) {
            return interaction.editReply("❌ You can't play against bots.");
        }

        if (opponent.id === interaction.user.id) {
            return interaction.editReply("❌ You can't play against yourself.");
        }

        await interaction.channel.send(`${opponent}, you've been challenged to a game of **Tic Tac Toe** by ${interaction.user}!`);


        const Game = new TicTacToe({
            message: interaction,
            isSlashGame: true,
            opponent: opponent,
            embed: {
                title: "Tic Tac Toe",
                color: "#5865F2",
                statusTitle: "Game Status",
                overTitle: "Game Over"
            },
            emojis: {
                xButton: "❌",
                oButton: "🔵",
                blankButton: "➖"
            },
            timeoutTime: 120000,
            xButtonStyle: "DANGER",
            oButtonStyle: "PRIMARY",
            turnMessage: "{emoji} | It's **{player}**'s turn!",
            winMessage: "{emoji} | **{player}** won the game!",
            tieMessage: "It's a tie!",
            timeoutMessage: "Game ended due to inactivity!",
            playerOnlyMessage: "Only {player} and {opponent} can use these buttons."
        });


        
        await Game.startGame();

    }
};
