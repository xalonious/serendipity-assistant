const ticketSchema = require("../../schemas/ticket");
const roles = require("../../utils/roles");
const { ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "add",
    description: "Add a member to a ticket",
    usage: "<user>",
    rolesRequired: [roles.MR],
    options: [
        {
            name: "member",
            description: "The member to add to the ticket",
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],

        run: async(client, interaction) => {

            await interaction.deferReply();

            const member = interaction.options.getMember("member");

            const ticketData = await ticketSchema.findOne({ ChannelID: interaction.channel.id });

            if(!ticketData) return interaction.editReply("This command can only be used in a ticket channel.");

            
            if(ticketData.AddedID) return interaction.editReply("This ticket already has a member added to it.");

            const memberid = member.id;



            await interaction.channel.permissionOverwrites.edit(memberid, {
                [PermissionsBitField.Flags.ViewChannel]: true,
                [PermissionsBitField.Flags.SendMessages]: true,
                [PermissionsBitField.Flags.EmbedLinks]: true,
                [PermissionsBitField.Flags.AttachFiles]: true
            });


            await ticketSchema.updateOne({ ChannelID: interaction.channel.id }, { AddedID: memberid });



            await interaction.editReply(`${member} was added to the ticket!`);


        }

}