const { ApplicationCommandOptionType } = require('discord.js');
const SpecialTag = require("../../schemas/specialtag");
const roles = require("../../utils/roles");
const { getRobloxIdFromDiscordId } = require("../../utils/bloxlinkUtils");

module.exports = {
  name: "seteotm",
  description: "Sets the Employee of the Month",
  usage: "<user>",
  rolesRequired: [roles.SHR],
  options: [
    {
      name: "user",
      description: "the user to set as Employee of the Month",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    await interaction.deferReply();

    const eotmUser = interaction.options.getUser("user");
    const discordId = eotmUser.id;
    const robloxId = await getRobloxIdFromDiscordId(discordId);

    const existing = await SpecialTag.findOne({ discordid: discordId });

    if (existing?.tags.includes("EOTM")) {
      return interaction.editReply("This user is already set as Employee of the Month.");
    }

    if (existing) {
      await SpecialTag.updateOne(
        { discordid: discordId },
        { $addToSet: { tags: "EOTM" } }
      );
    } else {
      await SpecialTag.create({
        discordid: discordId,
        robloxid: robloxId,
        tags: ["EOTM"],
      });
    }

    return interaction.editReply(`✅ ${eotmUser.username} has been set as Employee of the Month!`);
  },
};
