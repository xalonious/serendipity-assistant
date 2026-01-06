const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "cat",
    description: "Get a random cat image",

    run: async (client, interaction) => {
        await interaction.deferReply();

        try {
            const response = await axios.get("https://api.thecatapi.com/v1/images/search");
            const catImage = response.data[0].url;

            const embed = new EmbedBuilder()
                .setTitle("Here's a random cat for you!")
                .setImage(catImage)
                .setColor(0xFFC0CB);

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error("Error fetching cat image:", error);
            await interaction.editReply("Sorry, I couldn't fetch a cat image at the moment. Please try again later.");
        }
    }
}