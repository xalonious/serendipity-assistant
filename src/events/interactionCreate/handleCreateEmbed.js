const { EmbedBuilder, ChannelType, MessageFlags, PermissionsBitField } = require("discord.js");

module.exports = async (client, interaction) => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === "create_embed_modal") {
        const title = interaction.fields.getTextInputValue("embed_title");
        const description = interaction.fields.getTextInputValue("embed_description");
        const color = interaction.fields.getTextInputValue("embed_color");
        const image = interaction.fields.getTextInputValue("embed_image");
        const channelId = interaction.fields.getTextInputValue("embed_channel");

        const targetChannel = await interaction.guild.channels.fetch(channelId).catch(() => null);

        if (!targetChannel || targetChannel.type !== ChannelType.GuildText) {
            return interaction.reply({
                content: `❌ Invalid channel ID provided!`,
                flags: MessageFlags.Ephemeral
            });
        }

        const member = await interaction.guild.members.fetch(interaction.user.id);
        const permissions = targetChannel.permissionsFor(member);

        if (!permissions || !permissions.has(PermissionsBitField.Flags.SendMessages)) {
            return interaction.reply({
                content: `❌ You don't have permission to send messages in <#${channelId}>.`,
                flags: MessageFlags.Ephemeral
            });
        }

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(color || "#2F3136");

        if (image) embed.setImage(image);

        await targetChannel.send({ embeds: [embed] });

        await interaction.reply({
            content: `✅ Embed sent to <#${channelId}>!`,
            flags: MessageFlags.Ephemeral
        });
    }
};
