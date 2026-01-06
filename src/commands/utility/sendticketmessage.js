const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: "sendticketmessage",
    description: "sends the ticket message",
    devOnly: true,

    run: async (client, interaction) => {
        const ticketEmbed = new EmbedBuilder()
            .setTitle("Ticket Support")
            .setDescription("➜ In the dropdown, choose the button that corresponds to the type of support you need. \n\n 🔰 **Low tier support** \n ➜ General questions \n ➜ Report an LR \n ➜ Report a troller \n ➜ Report an exploiter \n ➜ Report a raid \n ➜ Report a spammer \n ➜ Report someone in the discord server for breaking server rules \n ➜ Report a bug \n\n ⭐ **Medium tier support** \n ➜ Report an exploiter \n ➜ Appeal a game warning \n ➜ Appeal a suspension \n\n 🛡️ **High tier support** \n ➜ Appeal a discord warning \n ➜ Appeal a discord ban \n ➜ Appeal a game ban \n\n 🎀 **Moderation Support** \n ➜ Report a Shift intern \n ➜ Report an MR (Shift Assistant, Shift Manager, Assistant Supervisor, Supervisor, Assistant Security) \n\n 🍉 **Public relations support** \n ➜ Post alliance pictures (MR+) \n ➜ Report affiliates \n ➜ Event concerns" )
            .setColor("Blurple")
            .setFooter({ text: "Serendipity ticket system", iconURL: client.user.displayAvatarURL() });

        const selectMenu = new StringSelectMenuBuilder()
            .setPlaceholder("Select an option...")
            .setCustomId("ticket-select")
            .addOptions([
                new StringSelectMenuOptionBuilder()
                    .setLabel("Low tier support")
                    .setValue("Low")
                    .setEmoji("🔰"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("Medium tier support")
                    .setValue("Medium")
                    .setEmoji("⭐"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("High tier support")
                    .setValue("High")
                    .setEmoji("🛡️"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("Moderation Support")
                    .setValue("Mod")
                    .setEmoji("🎀"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("Public Relations Support")
                    .setValue("PR")
                    .setEmoji("🍉"),
            ]);

        const row = new ActionRowBuilder()
            .addComponents(selectMenu);

        await interaction.guild.channels.cache.get("705978922747035716").send({
            embeds: [ticketEmbed],
            components: [row]
        });

        interaction.reply("✅ Ticket message sent!");
    }
}; 