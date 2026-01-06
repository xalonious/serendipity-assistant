const { Trivia } = require("discord-gamecord");

module.exports = {
    name: "trivia",
    description: "Test your knowledge with a game of trivia!",

    run: async (client, interaction) => {
        await interaction.deferReply();

        const Game = new Trivia({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: "Trivia",
                color: "#3498db",
                description: "You have 60 seconds to answer each question!"
            },
            timeoutTime: 120000,
            buttonStyle: "PRIMARY",
            trueButtonStyle: "SUCCESS",
            falseButtonStyle: "DANGER",
            mode: "multiple", 
            winMessage: "🎉 Correct! The answer was **{answer}**.",
            loseMessage: "❌ Wrong! The correct answer was **{answer}**.",
            timeoutMessage: "⌛ Time's up!",
        });

        await Game.startGame();

    }
};
