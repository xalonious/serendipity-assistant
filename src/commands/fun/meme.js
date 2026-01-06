const { EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "meme",
  description: "Get a wholesome meme!",

  run: async (client, interaction) => {
    await interaction.deferReply();

    try {
      const response = await axios.get("https://meme-api.com/gimme/wholesomememes");
      const meme = response.data;

      const embed = new EmbedBuilder()
        .setTitle(meme.title)
        .setURL(meme.postLink)
        .setImage(meme.url)
        .setFooter({ text: `👍 ${meme.ups} | r/${meme.subreddit} | by u/${meme.author}` })
        .setColor("Random");

      return interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error("Failed to fetch meme:", error);
      return interaction.editReply("❌ Couldn't fetch a wholesome meme. Try again later!");
    }
  },
};
