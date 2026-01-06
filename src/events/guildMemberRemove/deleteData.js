const levelSchema = require("../../schemas/level");
const specialtagSchema = require("../../schemas/specialtag");
const economySchema = require("../../schemas/economy");

module.exports = async(client, guildMember) => {
    await levelSchema.findOneAndDelete({
        userId: guildMember.user.id,
    });

    await specialtagSchema.findOneAndDelete({
        discordid: guildMember.user.id,
    });

    await economySchema.findOneAndDelete({
        userId: guildMember.user.id,
    });
}