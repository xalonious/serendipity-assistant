const { ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");
const sendLog = require("../../utils/sendLog");
require("dotenv").config();

module.exports = {
  name: "unban",
  description: "Unbans a user",
  usage: "<user_id> [reason]",
  permissionsRequired: [PermissionsBitField.Flags.BanMembers],
  options: [
    {
      name: "user",
      description: "The ID of the user you want to unban",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "reason",
      description: "The reason for the unban",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    await interaction.deferReply(); 

    const userId = interaction.options.getString("user");
    const reason = interaction.options.getString("reason") || "No reason given";

    try {
      const user = await client.users.fetch(userId);

      await interaction.guild.bans.remove(userId, reason);

      sendLog(
        client,
        "User unbanned",
        "Someone was unbanned from the server",
        [
          { name: "User", value: `${user.tag} (${user.id})` },
          { name: "Reason", value: reason },
          { name: "Responsible moderator", value: `${interaction.member}` },
        ],
        "Green",
        user.displayAvatarURL()
      );

      return interaction.editReply(`Successfully unbanned ${user.tag}.`);
    } catch (error) {
      console.log(error);
      return interaction.editReply("The user ID is invalid or the user is not banned.");
    }
  },
};
