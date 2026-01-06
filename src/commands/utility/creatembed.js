const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
const roles = require("../../utils/roles");

module.exports = {
    name: "createembed",
    description: "Creates an embed with the given properties",
    rolesRequired: [roles.MR],
    run: async (client, interaction) => {

        const modal = new ModalBuilder()
            .setCustomId("create_embed_modal")
            .setTitle("Create a Custom Embed");

        const titleInput = new TextInputBuilder()
            .setCustomId("embed_title")
            .setLabel("Embed Title")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const descInput = new TextInputBuilder()
            .setCustomId("embed_description")
            .setLabel("Embed Description")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const colorInput = new TextInputBuilder()
            .setCustomId("embed_color")
            .setLabel("Embed Color (hex, e.g. #5865F2)")
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        const imageInput = new TextInputBuilder()
            .setCustomId("embed_image")
            .setLabel("Embed Image URL (optional)")
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        const channelIdInput = new TextInputBuilder()
            .setCustomId("embed_channel")
            .setLabel("Channel ID (leave for current channel)")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setValue(interaction.channel.id); 

        const rows = [
            new ActionRowBuilder().addComponents(titleInput),
            new ActionRowBuilder().addComponents(descInput),
            new ActionRowBuilder().addComponents(colorInput),
            new ActionRowBuilder().addComponents(imageInput),
            new ActionRowBuilder().addComponents(channelIdInput),
        ];

        modal.addComponents(...rows);
        await interaction.showModal(modal);
    },
};
