const ticketSchema = require("../../schemas/ticket");
const { PermissionsBitField, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require("discord.js");

module.exports = async (client, interaction) => {
    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId !== "ticket-select") return;

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const { guild, member, values } = interaction;
    const value = values[0];

    if(member.roles.cache.has("1386786031558328360")) return interaction.editReply("You are blacklisted from creating tickets.");

    const openTickets = await ticketSchema.find({ MemberID: member.id, Closed: false });
    if (openTickets.length >= 2) {
        return interaction.editReply("You can only have a maximum of 2 open tickets at a time.");
    }

    const ticketId = Math.floor(Math.random() * 1000000);

    if (!["Low", "Medium", "High", "Mod", "PR"].includes(value)) return;

    await interaction.editReply("Creating ticket...")

    let parent;
    let pingedRole;
    let trialHr = null;

    switch (value) {
        case "Low":
            parent = "1013961084438331543"; 
            pingedRole = "829317232961650688"
            break;
        case "Medium":
            parent = "1013961420553060372"; 
            pingedRole = "829316473742688278"
            trialHr = "751923256595841114";
            break;
        case "High":
            parent = "1013961659053781003"; 
            pingedRole = "829320212896677940"
            break;
        case "Mod":
            parent = "1415312386377650308";
            pingedRole = "850417619265257482";
            break;
        case "PR":
            parent = "1338579778546171937"; 
            pingedRole = "716845680018325574"
            break;
    }




    await guild.channels
        .create({
            name: `ticket-${member.user.username}`,
            type: ChannelType.GuildText,
            parent: parent,
            permissionOverwrites: [
                { id: "695867796286079037", deny: [PermissionsBitField.Flags.ViewChannel] },
                { id: member.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles] },
                { id: pingedRole, allow: [PermissionsBitField.Flags.ViewChannel]}
            ],
        })
        .then(async (channel) => {
               await ticketSchema.create({
                MemberID: member.id,
                TicketID: ticketId,
                ChannelID: channel.id,
                Closed: false,
                Type: value,
            });

            if(trialHr) {
                await channel.permissionOverwrites.edit(trialHr, { ViewChannel: true });
            }

            await interaction.editReply(`Ticket created successfully! https://discord.com/channels/${guild.id}/${channel.id}`);

            const ticketEmbed = new EmbedBuilder()
                .setTitle(`Ticket Opened | type: ${value + " Tier Support"}`)
                .setDescription(`Thank you for creating a ticket, support will be with you shortly. While you wait, please describe your issue. Please note that your ticket may be closed if you do not state your issue within 30 minutes.`)
                .setColor("Blue")
                .setFooter({ text: `Ticket ID: ${ticketId}`, iconURL: member.displayAvatarURL({ dynamic: true }) });

            const ticketButton = new ActionRowBuilder().setComponents(
                new ButtonBuilder().setCustomId("claim").setLabel("Claim Ticket").setStyle(ButtonStyle.Danger).setEmoji("🙋🏾‍♂️"),
            );


            channel.send({
                content: `<@${member.id}> <@&${pingedRole}>`,
                embeds: [ticketEmbed],
                components: [ticketButton],
            });
        });
};