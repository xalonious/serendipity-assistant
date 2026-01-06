const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "dog",
    description: "Get a random dog image",

    run: async (client, interaction) => {
        await interaction.deferReply();

        try {
            const response = await axios.get("https://api.thedogapi.com/v1/images/search");
            const dogImage = response.data[0].url;

            const embed = new EmbedBuilder()
                .setTitle("Here's a random dog for you!")
                .setImage(dogImage)
                .setColor(0xADD8E6); 

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error("Error fetching dog image:", error);
            await interaction.editReply("Sorry, I couldn't fetch a dog image at the moment. Please try again later.");
        }
    }
}
