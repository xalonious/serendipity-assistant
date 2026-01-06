const { GuessThePokemon } = require('discord-gamecord');

module.exports = {
    name: "guessthepokemon",
    description: "Guess the Pokemon",

    run: async(client, interaction) => {


        const Game = new GuessThePokemon({
            message: interaction, 
            isSlashGame: true,
            embed: {
                title: 'Who\'s That Pokémon?',
                color: '#FFA500',
                description: 'You have **60 seconds** to guess the Pokémon!'
            },
            timeoutTime: 60000,
            winMessage: 'You guessed it right! It was **{pokemon}**!',
            loseMessage: 'You lost! The correct answer was **{pokemon}**.',
            playerOnlyMessage: 'Only {player} can use these buttons.'
        });

        await Game.startGame();

    }
}