const SpecialTag = require("../../schemas/specialtag");
const roles = require("../../utils/roles");
require("dotenv").config();

module.exports = async (client, oldMember, newMember) => {
  if(newMember.user.id === process.env.DEV_ID) return;
  if (newMember.partial) {
    try {
      newMember = await newMember.fetch();
    } catch (error) {
      console.error('[ERROR] Failed to fetch partial member:', error);
      return;
    }
  }

  const boosterRole = newMember.guild.roles.cache.get(roles.BOOSTER);
  if (!boosterRole) return;

  if (!newMember.roles.cache.has(boosterRole.id)) {
    const specialTag = await SpecialTag.findOne({ discordid: newMember.id });
    if (!specialTag?.tags.includes("BOOSTER")) return;

    specialTag.tags.pull("BOOSTER");
    await specialTag.save();
    console.log(`[DB] Removed BOOSTER tag for ${newMember.user.tag}`);

    if (specialTag.tags.length === 0) {
      await SpecialTag.deleteOne({ discordid: newMember.id });
      console.log(`[DB] Deleted ${newMember.user.tag} from specialtag DB (no longer has any special tags)`);
    }
  }
};
