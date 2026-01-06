const specialtagSchema = require('../../schemas/specialtag');
const { ApplicationCommandOptionType } = require('discord.js');
const roles = require("../../utils/roles");

module.exports = {
    name: "removecontentcreator",
    description: "Remove a user as a content creator",
    usage: "<user>",
    rolesRequired: [roles.SHR],
    options: [
        {
            name: "user",
            description: "The user to remove",
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],

    run: async (client, interaction) => {
        await interaction.deferReply();

        const user = interaction.options.getUser("user");

        const specialTag = await specialtagSchema.findOne({ discordid: user.id });

        if (!specialTag || !specialTag.tags.includes("CONTENT_CREATOR")) {
            return interaction.editReply("This user is not set as a content creator.");
        }

        specialTag.tags.pull("CONTENT_CREATOR");
        await specialTag.save();

        if (specialTag.tags.length === 0) {
            await specialtagSchema.deleteOne({ discordid: user.id });
        }

        return interaction.editReply(`Successfully removed ${user.username} as a content creator.`);
    }
};
