const { EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js")
const sendLog = require("../../utils/sendLog")
const roles = require("../../utils/roles")
require("dotenv").config()
module.exports = {
 name: "kick",
 description: "kicks a user from the server",
 permissionsRequired: [PermissionsBitField.Flags.KickMembers],
 options: [
    {
        name: "user",
        description: "the user who you want to kick",
        type: ApplicationCommandOptionType.User,
        required: true
    },
    {
        name: "reason",
        description: "the reason for the kick",
        type: ApplicationCommandOptionType.String,
        required: false
    }
 ],


        run: async(client, interaction) => {

        await interaction.deferReply()

        const target = interaction.options.getMember("user")

        let reason = interaction.options.getString("reason") || "No reason given"

                if (target) {
                  if(target.roles.cache.get(roles.MR)) {
                    return interaction.editReply("That user is a staff member, I cannot kick them.");
                  }
                }
            
                const bannedloser = new EmbedBuilder()
                .setTitle(`You were kicked from ${interaction.guild.name}`)
                .addFields(
                    {name: "Kick reason", value: reason},
                    {name: "Moderator", value: `${interaction.member}`}
                )
                .setColor("Red")
                .setThumbnail(interaction.guild.iconURL())



                let confirmationMessage = `Succesfully kicked ${target.user.tag}`

                try {
                    await target.send({ embeds: [bannedloser]})
                } catch(error) {
                    confirmationMessage = `Succesfully kicked ${target.user.tag}, I was unable to notify them.`
                }

              setTimeout(() => {
                 target.kick({
                    reason: reason
                }).then(() => interaction.editReply(confirmationMessage))
              }, 1000)
                

            sendLog(
            client,
            "User kicked",
            "Someone was kicked from the server",
            [
                { name: "User", value: `${target} (${target.id})` },
                { name: "Reason", value: reason },
                { name: "Responsible moderator", value: `${interaction.member}` },
                ],
            "Red",
            target.user.displayAvatarURL()
            );
    }}