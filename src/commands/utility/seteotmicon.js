const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "seteotmicon",
    description: "sets the icon for your eotm role",
    usage: "<icon>",
    rolesRequired: ["912785599281385533", "828738761403662376", "698613042023497848", "906643852474073098", "1254109307134414940"],
    options:  [
        {
            name: "icon",
            description: "The icon to set for your eotm role",
            type: ApplicationCommandOptionType.Attachment,
            required: true
        }
    ],

    run: async(client, interaction) => {
        await interaction.deferReply();
        const eotmRoles = ["912785599281385533", "828738761403662376", "698613042023497848", "906643852474073098", "1254109307134414940"]

        let userEotmRole;
        for (const roleId of eotmRoles) {
            if (interaction.member.roles.cache.has(roleId)) {
                userEotmRole = roleId;
                break;
            }
        }

        const eotmRole = interaction.guild.roles.cache.get(userEotmRole);

        const icon = interaction.options.getAttachment("icon");

         if (!icon.contentType?.startsWith('image/')) {
            return interaction.editReply("Please provide a valid image file.");
          }

         if (icon.size > 256 * 1024) {
            return interaction.editReply("Please provide an image file no larger than 256kb.");
          }

          try {
            await eotmRole.setIcon(icon.url);
            return interaction.editReply("Your EOTM role icon has been updated!");
          } catch(error) {
            console.error(error);
            return interaction.editReply("An error occurred while updating the role icon. Please ensure you are uploading a valid image file.");
          }







    }
}