const { Hangman } = require("discord-gamecord");

module.exports = {
    name: "hangman",
    description: "Play a game of Hangman!",

    run: async (client, interaction) => {
        await interaction.deferReply();


        const Game = new Hangman({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: "Hangman",
                color: "#5865F2"
            },
            hangman: {
                hat: "🎩",
                head: "🥲",
                shirt: "👕",
                pants: "👖",
                boots: "👢👢"
            },
            customWord: null, 
            timeoutTime: 120000,
            theme: "nature", 
            winMessage: "🎉 You won! The word was **{word}**.",
            loseMessage: "💀 You lost! The word was **{word}**.",
            timeoutMessage: "⌛ Time's up! The word was **{word}**.",
            playerOnlyMessage: "Only {player} can use these buttons."
        });

        await Game.startGame();

    }
};
