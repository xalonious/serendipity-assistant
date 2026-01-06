const { ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");
const Warnings = require("../../schemas/warning");
const roles = require("../../utils/roles");

module.exports = {
  name: "deletewarning",
  description: "Deletes a specific warning by its ID",
  usage: "<warnid>",
  rolesRequired: [roles.SHR],
  options: [
    {
      name: "warnid",
      description: "The ID of the warning to delete",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    await interaction.deferReply();

    const warnId = interaction.options.getString("warnid");

    let doc;
    try {
      doc = await Warnings.findOne({ "warnings.warnid": warnId });
    } catch (err) {
      console.error(err);
      return interaction.editReply("Failed to search the database.");
    }

    if (!doc) {
      return interaction.editReply(
        `I couldn't find any warning with ID \`${warnId}\`.`
      );
    }

    const userId = doc.userid;
    const beforeCount = doc.warnings.length;

    doc.warnings = doc.warnings.filter(w => w.warnid !== warnId);

    if (doc.warnings.length === beforeCount) {
      return interaction.editReply(
        `I couldn't find any warning with ID \`${warnId}\`.`
      );
    }

    try {
      if (doc.warnings.length === 0) {
        await Warnings.deleteOne({ userid: userId });
        return interaction.editReply(
          `✅ Deleted warning \`${warnId}\`. That user now has 0 warnings.`
        );
      } else {
        await doc.save();
        return interaction.editReply(
          `✅ Deleted warning \`${warnId}\`. That user now has ${doc.warnings.length} warning(s).`
        );
      }
    } catch (err) {
      console.error(err);
      return interaction.editReply("Failed to delete the warning.");
    }
  },
};
