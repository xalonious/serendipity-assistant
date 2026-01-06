const postToRoblox = require('../../utils/postToRoblox');
const { ApplicationCommandOptionType, MessageFlags } = require('discord.js');
const roles = require('../../utils/roles');

module.exports = {
  name: "shout",
  description: "Posts a group shout",
  usage: "<type> <title> <content>",
  rolesRequired: [roles.MR],
  options: [
    {
      name: "type",
      description: "The type of post to send",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        { name: "General", value: "general" },
        { name: "Shift", value: "shift" },
        { name: "Training", value: "training" },
      ],
    },
    {
      name: "title",
      description: "The title of the post",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "content",
      description: "The content of the post",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const type = interaction.options.getString("type");
    const title = interaction.options.getString("title");
    const content = interaction.options.getString("content");

    try {
      await postToRoblox(type, title, content);
      return interaction.editReply("Successfully posted shout!");
    } catch (err) {
      const status = err?.status; 
      const body = String(err?.body || err?.message || ""); 

      if (status === 429) {
        return interaction.editReply(
          "HTTP 429: Too Many Requests. Please wait a while before trying to post another shout."
        );
      }

      if (status === 503) {
        return interaction.editReply(
          "HTTP 503: Service Unavailable. Roblox's image scanning service seems to be down. Please try again."
        );
      }

      if (status === 400 && body.toLowerCase().includes("inappropriate")) {
        return interaction.editReply(
          "HTTP 400: Bad Request. Roblox has flagged your shout as inappropriate and is probably being fucking stupid again. Please try to rewrite your shout a bit and try again."
        );
      }

      console.log("Error posting to Roblox:", err);
      return interaction.editReply(
        "An error occurred while trying to post. Please try again. If the issue persists, contact Xander."
      );
    }
  },
};
