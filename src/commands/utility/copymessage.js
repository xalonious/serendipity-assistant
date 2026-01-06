const { ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "copymessage",
    description: "Copy and resend a message using a Discord message link.",
    usage: "<message link> <?channel>",
    permissionsRequired: [PermissionsBitField.Flags.Administrator],
    options: [
        {
            name: "link",
            description: "The message link (right-click → Copy Message Link)",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "channel",
            description: "The channel to send the copied message to",
            type: ApplicationCommandOptionType.Channel,
            required: false
        }
    ],

    run: async (client, interaction) => {
        await interaction.deferReply();

        const link = interaction.options.getString("link");
        const channelToSendTo = interaction.options.getChannel("channel") || interaction.channel;

        const match = link.match(/\/channels\/\d+\/(\d+)\/(\d+)/);
        if (!match) {
            return interaction.editReply({ content: "❌ Invalid message link format." });
        }

        const channelId = match[1];
        const messageId = match[2];

        try {
            const channel = await client.channels.fetch(channelId);
            if (!channel || !channel.isTextBased()) {
                return interaction.editReply({ content: "❌ Invalid or inaccessible channel." });
            }

            const message = await channel.messages.fetch(messageId);
            if (!message) {
                return interaction.editReply({ content: "❌ Message not found." });
            }

            const files = [...message.attachments.values()];
            const content = message.content || '';
            const embeds = message.embeds || [];

            await channelToSendTo.send({ content, embeds, files });
            await interaction.editReply({ content: "✅ Message copied successfully!" });

        } catch (err) {
            console.error(err);
            await interaction.editReply({ content: "❌ Error copying message. Check the link and permissions." });
        }
    }
};
