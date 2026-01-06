const { ApplicationCommandOptionType } = require("discord.js");
const { RockPaperScissors } = require("discord-gamecord");

module.exports = {
    name: "rps",
    description: "Challenge someone to a game of Rock Paper Scissors!",
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
            content: `${opponent}, you've been challenged to **Rock Paper Scissors** by ${challenger}!`,
            allowedMentions: { users: [opponent.id] }
        });


        const Game = new RockPaperScissors({
            message: interaction,
            isSlashGame: true,
            opponent,
            embed: {
                title: "Rock Paper Scissors",
                color: "#5865F2",
                description: "Press a button below to choose."
            },
            buttons: {
                rock: "🪨",
                paper: "📄",
                scissors: "✂️"
            },
            emojis: {
                rock: "🪨",
                paper: "📄",
                scissors: "✂️"
            },
            mentionUser: false,
            timeoutTime: 120000,
            buttonStyle: "PRIMARY",
            pickMessage: "You chose {emoji}",
            winMessage: "**{player}** won the game!", 
            tieMessage: "It's a tie! You both chose the same.",
            timeoutMessage: "Game ended due to inactivity!",
            playerOnlyMessage: "Only {player} and {opponent} can use these buttons."
        });

        await Game.startGame();
    }
};
