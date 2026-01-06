const { FindEmoji } = require("discord-gamecord");

module.exports = {
    name: "findemoji",
    description: "Find the matching emoji as fast as you can!",

    run: async (client, interaction) => {
        await interaction.deferReply();



        const Game = new FindEmoji({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: "Find the Emoji",
                color: "#f1c40f",
                description: "You have 60 seconds to find the correct emoji!"
            },
            timeoutTime: 60000,
            hideEmojiTime: 5000,
            buttons: {
                correct: "✅",
                wrong: "❌"
            },
            winMessage: "🎉 You found it!",
            loseMessage: "❌ You failed to find the correct emoji in time.",
            timeoutMessage: "⌛ Time's up! You didn't click anything.",
            playerOnlyMessage: "Only {player} can use these buttons."
        });

        await Game.startGame();
    }
};
