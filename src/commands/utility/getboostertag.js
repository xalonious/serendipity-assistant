const SpecialTag = require("../../schemas/specialtag");
const { getRobloxIdFromDiscordId } = require("../../utils/bloxlinkUtils");
const roles = require("../../utils/roles");

module.exports = {
  name: "getboostertag",
  description: "Allows you to get the booster tag in game",
  rolesRequired: [roles.BOOSTER],

  run: async (client, interaction) => {
    await interaction.deferReply();

    const userId = interaction.user.id;
    const robloxId = await getRobloxIdFromDiscordId(userId);
    if (!robloxId) {
      return interaction.editReply(
        "You don't seem to be linked to a Roblox account. Please make sure you are verified with Bloxlink."
      );
    }

    const specialTag = await SpecialTag.findOne({ robloxid: robloxId });

    if (specialTag?.tags.includes("BOOSTER")) {
      return interaction.editReply("You already have the booster tag.");
    }

    if (specialTag) {
      await SpecialTag.updateOne(
        { robloxid: robloxId },
        { $addToSet: { tags: "BOOSTER" } }
      );
    } else {
      await SpecialTag.create({
        discordid: userId,
        robloxid: robloxId,
        tags: ["BOOSTER"],
      });
    }

    return interaction.editReply(
      '✅ You have been added to the database! You can now get the booster tag by selecting the "special" tag in game.'
    );
  },
};
