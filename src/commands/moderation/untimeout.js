const { ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");
const sendLog = require("../../utils/sendLog");
require("dotenv").config();

module.exports = {
  name: "untimeout",
  description: "removes a user's timeout",
  usage: "<user> [reason]",
  permissionsRequired: [PermissionsBitField.Flags.ModerateMembers],
  options: [
    {
      name: "user",
      description: "the user who you want to remove timeout from",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "reason",
      description: "the reason for removing the timeout",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    await interaction.deferReply();

    const targetMember = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason") || "No reason given";

    if (!targetMember) {
      return interaction.editReply("That user isn't in this server.");
    }

    if (
      targetMember.roles.highest.position >= interaction.member.roles.highest.position &&
      interaction.user.id !== interaction.guild.ownerId
    ) {
      return interaction.editReply(
        "You can't remove timeout from someone with a role that is equal to or higher than yours."
      );
    }

    if (!targetMember.isCommunicationDisabled()) {
      return interaction.editReply("This user is not in timeout.");
    }

    try {
      await targetMember.timeout(null, reason);

      await interaction.editReply(
        `Removed timeout from ${targetMember.user.tag}.`
      );

      sendLog(
        client,
        "User un-timed out",
        "Someone had their timeout removed",
        [
          { name: "User", value: `${targetMember} (${targetMember.id})` },
          { name: "Reason", value: reason },
          { name: "Responsible moderator", value: `${interaction.member}` },
        ],
        "Green",
        targetMember.user.displayAvatarURL()
      );
    } catch (error) {
      console.log(error);
      return interaction.editReply(
        "An error occurred while removing timeout. Make sure my role is high enough and I have Moderate Members permission."
      );
    }
  },
};
