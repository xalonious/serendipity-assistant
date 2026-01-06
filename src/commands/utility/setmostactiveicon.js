const roles = require("../../utils/roles")
const { ApplicationCommandOptionType } = require("discord.js");
module.exports = {
    name: "setmostactiveicon",
    description: "sets the role icon for the most active role",
    usage: "<icon>",
    rolesRequired: [roles.MOST_ACTIVE],
    options: [
        {
            name: "icon",
            description: "The icon to set for the most active role",
            type: ApplicationCommandOptionType.Attachment,
            required: true
        }
    ],

    run: async(client, interaction) => {
        await interaction.deferReply();

        const icon = interaction.options.getAttachment("icon");

        const role = interaction.guild.roles.cache.get(roles.MOST_ACTIVE);


        if (!icon.contentType?.startsWith('image/')) {
            return interaction.editReply("Please provide a valid image file.");
          }

        
        if (icon.size > 256 * 1024) {
            return interaction.editReply("Please provide an image file no larger than 256kb.");
          }

          try {
            await role.setIcon(icon.url);
            return interaction.editReply("The role icon has been updated!");
          } catch(error) {
            console.error(error);
            return interaction.editReply("An error occurred while updating the role icon. Please ensure you are uploading a valid image file.");
          }


    }
    
}