const ticketSchema = require("../../schemas/ticket")
const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require("discord.js")
const { createTranscript } = require("discord-html-transcripts")

module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;
    const { guild, member, customId, channel } = interaction;
    if (!["close", "open", "delete", "claim"].includes(customId)) return;

    const permissions = member.roles.cache.get("829317232961650688") || member.roles.cache.get("716845680018325574");

    let data;
    let ticketOwner;

    try {
        data = await ticketSchema.findOne({ ChannelID: channel.id });
        if (!data) return;

        ticketOwner = guild.members.cache.get(data.MemberID);
        if (!ticketOwner) {
            try {
                ticketOwner = await guild.members.fetch(data.MemberID);
            } catch {
                ticketOwner = null;
            }
        }

        if (!permissions) return await interaction.reply({ content: "You do not have permission to do that.", flags: MessageFlags.Ephemeral });

        switch (customId) {
            case "claim":
                if(data.ClaimedID) return await interaction.reply( { content: "This ticket has already been claimed.", flags: MessageFlags.Ephemeral } );
                const closeButton = new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId("close").setLabel("Close Ticket").setStyle(ButtonStyle.Secondary).setEmoji("🔒"),
                )
                await interaction.update({ components: [closeButton] });
                await interaction.followUp(`Your ticket will be handled by ${member}`);
                await ticketSchema.updateOne({ ChannelID: channel.id }, { ClaimedID: member.id });
            break;
            case "delete":
                const transcriptChannel = guild.channels.cache.get("705977972766802041");
                await interaction.reply("Saving transcript...");

                const transcript = await createTranscript(channel, {
                    filename: `ticket-${data.TicketID}.html`,
                });

                const ownerName = ticketOwner?.user?.username ?? `Unknown User`;
                const ownerIcon = ticketOwner?.displayAvatarURL({ dynamic: true }) ?? undefined;
                const ownerMention = `<@${data.MemberID}>`;
                const claimedBy = `<@${data.ClaimedID}>` || "N/A";

                const transcriptEmbed = new EmbedBuilder()
                    .setTitle(`Transcript for ticket #${data.TicketID}`)
                    .setColor("Blue")
                    .setAuthor(ownerIcon ? { name: ownerName, iconURL: ownerIcon } : { name: ownerName })
                    .addFields(
                        { name: "Ticket Name", value: channel.name, inline: true },
                        { name: "Ticket ID", value: data.TicketID, inline: true },
                        { name: "Type", value: data.Type.toUpperCase(), inline: true },
                        { name: "Ticket Owner", value: ownerMention, inline: true },
                        { name: "Claimed By", value: claimedBy, inline: true },
                        { name: "Closed/Deleted By", value: `${member}`, inline: true },
                    )
                    .setThumbnail("https://cdn3.iconfinder.com/data/icons/block/32/ticket-512.png")
                    .setFooter({ text: "Serendipity Ticket System", iconURL: guild.iconURL() })

                await transcriptChannel.send({
                    embeds: [transcriptEmbed],
                    files: [transcript]
                });

                try {
                    await ticketOwner.send({
                        content: "Thank you for using our ticket system! Your ticket has been closed so your issue should now be resolved. If you need further assistance, don't hesitate to open another ticket! Your ticket transcript & details can be found below:",
                        embeds: [transcriptEmbed],
                        files: [transcript]
                    });
                } catch(err) {
                    console.log("couldn't dm ticket owner they prob have dms off");
                }

                interaction.editReply("Transcript successfully saved!");
                await interaction.followUp("Deleting ticket in 5 seconds...");
                setTimeout(async () => {
                    await channel.delete();
                }, 5000);

                await data.deleteOne();
                break;
            case "close":
                if (data.Closed) return await interaction.reply({ content: "Ticket is already closed.", flags: MessageFlags.Ephemeral });

                if (ticketOwner) {
                    channel.permissionOverwrites.edit(ticketOwner, { [PermissionsBitField.Flags.ViewChannel]: false });
                }

                if (data.AddedID) {
                    channel.permissionOverwrites.edit(data.AddedID, { [PermissionsBitField.Flags.ViewChannel]: false });
                }

                await channel.setName(`closed-${ticketOwner?.user?.username ?? "unknown"}`);

                const embedClosed = new EmbedBuilder()
                    .setTitle("Ticket Closed")
                    .setDescription(`Ticket closed by ${interaction.member}`)

                const closedButtons = new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId("open").setLabel("Open").setStyle(ButtonStyle.Secondary).setEmoji("🔓"),
                    new ButtonBuilder().setCustomId("delete").setLabel("Delete").setStyle(ButtonStyle.Secondary).setEmoji("🗑️"),
                )

                await interaction.reply({
                    embeds: [embedClosed],
                    components: [closedButtons]
                });

                await ticketSchema.updateOne({ ChannelID: channel.id }, { Closed: true });
                break;
            case "open":
                if (!data.Closed) return await interaction.reply({ content: "Ticket is already open.", flags: MessageFlags.Ephemeral });

                await ticketSchema.updateOne({ ChannelID: channel.id }, { Closed: false });

                if (ticketOwner) {
                    channel.permissionOverwrites.edit(ticketOwner, { [PermissionsBitField.Flags.ViewChannel]: true });
                }

                if (data.AddedID) {
                    channel.permissionOverwrites.edit(data.AddedID, { [PermissionsBitField.Flags.ViewChannel]: true });
                }

                await channel.setName(`ticket-${ticketOwner?.user?.username ?? "unknown"}`);

                interaction.reply(`Ticket reopened by ${interaction.member}`)
                break;
        }
    } catch (err) {
        if (err.message === "Unknown Member") {
            await interaction.reply("Ticket owner has left the server. Creating transcript & deleting ticket in 5 seconds...");

            const transcriptChannel = guild.channels.cache.get("705977972766802041");

            const transcript = await createTranscript(channel, {
                filename: `ticket-${data.TicketID}.html`,
            });

            const ownerName = ticketOwner?.user?.username ?? `Unknown User`;
            const ownerIcon = ticketOwner?.displayAvatarURL({ dynamic: true }) ?? undefined;

            const transcriptEmbed = new EmbedBuilder()
                .setTitle(`Transcript for ticket #${data.TicketID}`)
                .setColor("Blue")
                .setAuthor(ownerIcon ? { name: ownerName, iconURL: ownerIcon } : { name: ownerName })
                .addFields(
                    { name: "Ticket Owner", value: `${ticketOwner ?? "N/A"}`, inline: true },
                    { name: "Ticket Name", value: channel.name, inline: true },
                    { name: "Ticket ID", value: data.TicketID, inline: true },
                    { name: "Type", value: data.Type.toUpperCase(), inline: true },
                    { name: "Ticket Owner", value: ownerMention, inline: true },
                    { name: "Claimed By", value: claimedBy, inline: true },
                    { name: "Closed/Deleted By", value: "N/A - Auto delete", inline: true },
                )
                .setThumbnail("https://cdn3.iconfinder.com/data/icons/block/32/ticket-512.png")
                .setFooter({ text: "Serendipity Ticket System", iconURL: guild.iconURL() })

            await transcriptChannel.send({
                embeds: [transcriptEmbed],
                files: [transcript]
            });

            setTimeout(async () => {
                await channel.delete();
            }, 5000);

            await ticketSchema.deleteOne({ ChannelID: channel.id });
        } else {
            console.log(err);
        }
    }
};