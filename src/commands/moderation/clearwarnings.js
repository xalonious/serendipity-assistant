const { ApplicationCommandOptionType } = require("discord.js");
const Warnings = require("../../schemas/warning");
const roles = require("../../utils/roles");

module.exports = {
  name: "clearwarnings",
  description: "Removes all warnings from a user",
  usage: "<user>",
  rolesRequired: [roles.SHR],
  options: [
    {
      name: "user",
      description: "The user whose warnings you want to clear",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    await interaction.deferReply();

    const targetUser = interaction.options.getUser("user");

    const targetMember = await interaction.guild.members
      .fetch(targetUser.id)
      .catch(() => null);

    if (!targetMember)
      return interaction.editReply("That user isn't in this server.");

    let doc;
    try {
      doc = await Warnings.findOne({ userid: targetUser.id });
    } catch (err) {
      console.error(err);
      return interaction.editReply("Failed to fetch warnings from the database.");
    }

    if (!doc || !doc.warnings || doc.warnings.length === 0) {
      return interaction.editReply(
        `${targetUser.tag} has no warnings to clear.`
      );
    }

    const clearedCount = doc.warnings.length;

    try {
      await Warnings.deleteOne({ userid: targetUser.id });
      return interaction.editReply(
        `✅ Cleared ${clearedCount} warning(s) from ${targetUser.tag}.`
      );
    } catch (err) {
      console.error(err);
      return interaction.editReply("Failed to clear warnings.");
    }
  },
};
