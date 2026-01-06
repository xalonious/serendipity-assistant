const SpecialTag = require("../../schemas/specialtag");
const roles = require("../../utils/roles");

module.exports = {
  name: "cleareotm",
  description: "Clears all Employees of the Month",
  rolesRequired: [roles.SHR],

  run: async (client, interaction) => {
    await interaction.deferReply();

    await SpecialTag.updateMany(
      { tags: "EOTM" },
      { $pull: { tags: "EOTM" } }
    );

    await SpecialTag.deleteMany({ tags: { $size: 0 } });

    await interaction.editReply("✅ Cleared all Employees of the Month!");
  },
};
