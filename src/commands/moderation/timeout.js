const { ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");
const sendLog = require("../../utils/sendLog");
const roles = require("../../utils/roles");
const ms = require("ms");
require("dotenv").config();

module.exports = {
  name: "timeout",
  description: "puts a user in timeout",
  usage: "<user> <duration> [reason]",
  permissionsRequired: [PermissionsBitField.Flags.ModerateMembers],
  options: [
    {
      name: "user",
      description: "the user who you want to timeout",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "duration",
      description: "the duration of the timeout (30m, 1h, 1 day, etc)",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "reason",
      description: "the reason for the timeout",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    await interaction.deferReply(); 

    const targetMember = interaction.options.getMember("user");
    const durationStr = interaction.options.getString("duration");
    const reason = interaction.options.getString("reason") || "No reason given";

  

    const msDuration = ms(durationStr);
    if (!msDuration) {
      return interaction.editReply("Please provide a valid timeout duration.");
    }

    if (msDuration < 5000 || msDuration > 2.419e9) {
      return interaction.editReply(
        "Timeout duration cannot be less than 5 seconds or more than 28 days."
      );
    }

        if (targetMember) {
          if(targetMember.roles.cache.get(roles.MR)) {
            return interaction.editReply("That user is a staff member, I cannot time them out.");
          }
        }

    if (targetMember.isCommunicationDisabled()) {
      return interaction.editReply("This user is already in timeout.");
    }

    try {
      await targetMember.timeout(msDuration, reason);

      await interaction.editReply(
        `Timed out ${targetMember.user.tag} for ${durationStr}.`
      );

      sendLog(
        client,
        "User timed out",
        "Someone was timed out in the server",
        [
          { name: "User", value: `${targetMember} (${targetMember.id})` },
          { name: "Reason", value: reason },
          { name: "Duration", value: durationStr },
          { name: "Responsible moderator", value: `${interaction.member}` },
        ],
        "Red",
        targetMember.user.displayAvatarURL()
      );
    } catch (error) {
      console.log(error);
      return interaction.editReply(
        "An error occurred while timing out that user. Make sure my role is high enough and I have Moderate Members permission."
      );
    }
  },
};
