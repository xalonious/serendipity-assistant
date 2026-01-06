const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js")
module.exports = {
    name: "8ball",
    description: "Ask the magic 8-ball a question and get an answer!",
    usage: "<question>",
    options: [
        {
            name: "question",
            description: "The question you want to ask the magic 8-ball",
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    run: async(client, interaction) => {
        await interaction.deferReply();
        const question = interaction.options.getString("question");

        const answers = [
            "Yes.",
            "No.",
            "Maybe.",
            "Ask again later.",
            "Definitely.",
            "Absolutely not.",
            "It is certain.",
            "Without a doubt.",
            "Very doubtful.",
            "Signs point to yes.",
            "Better not tell you now.",
            "Concentrate and ask again.",
            "Outlook not so good.",
            "You may rely on it.",
            "Cannot predict now.",
            "Absolutely!",
            "I wouldn't count on it.",
            "The stars say yes.",
            "The stars say no.",
            "It's a mystery.",
            "Chances are high.",
            "Chances are low.",
            "The answer lies within you.",
            "Unlikely.",
            "All signs point to no.",
            "All signs point to yes.",
            "The future is unclear.",
            "Don't bet on it."
        ];

        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];


        const eightBallEmbed = new EmbedBuilder()
        .setTitle("Magic 8-Ball")
        .setDescription(`**Question:** ${question}\n**Answer:** ${randomAnswer}`)
        .setColor("Blurple")
        .setThumbnail("https://st2.depositphotos.com/1001248/8309/v/450/depositphotos_83091828-stock-illustration-billiard-ball.jpg") 


        await interaction.editReply({ embeds: [eightBallEmbed] });
    }
}