const specialtagSchema = require('../../schemas/specialtag');
const { ApplicationCommandOptionType } = require('discord.js');
const roles = require("../../utils/roles");
const { getRobloxIdFromDiscordId } = require("../../utils/bloxlinkUtils");

module.exports = {
    name: "setcontentcreator",
    description: "Set a user as a content creator",
    usage: "<user>",
    rolesRequired: [roles.SHR],
    options: [
        {
            name: "user",
            description: "The user to set as a content creator",
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],

    run: async(client, interaction) => {
        await interaction.deferReply();

        const user = interaction.options.getUser("user");

        const specialtagData = await specialtagSchema.findOne({ discordid: user.id });

        if (specialtagData && specialtagData.tags.includes("CONTENT_CREATOR")) {
            return interaction.editReply("This user is already set as a content creator.");
        }

        if (specialtagData) {
            await specialtagSchema.updateOne(
                { discordid: user.id },
                { $addToSet: { tags: "CONTENT_CREATOR" } }
            );
        } else {
            const robloxId = await getRobloxIdFromDiscordId(user.id);
            await specialtagSchema.create({
                discordid: user.id,
                robloxid: robloxId,
                tags: ["CONTENT_CREATOR"]
            });
        }

        return interaction.editReply(`✅ ${user.username} has been set as a content creator!`);
    }
}