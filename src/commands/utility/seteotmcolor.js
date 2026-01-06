const { ApplicationCommandOptionType } = require("discord.js")
const colorHex = /^#[0-9a-fA-F]{6}$/;
const hexToInt = (hex) => parseInt(hex.slice(1), 16);

module.exports = {
    name: "seteotmcolor",
    description: "sets the color for your eotm role",
    usage: "<starthex> <endhex>",
    rolesRequired: ["912785599281385533", "828738761403662376", "698613042023497848", "906643852474073098", "1254109307134414940"],
    options:  [
        {
            name: "starthex",
            description: "the starting hex color",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "endhex",
            description: "the ending hex color",
            type: ApplicationCommandOptionType.String,
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

        const startColor = interaction.options.getString("starthex");
        const endColor = interaction.options.getString("endhex");

        if (!colorHex.test(startColor) || !colorHex.test(endColor)) {
            return interaction.editReply("Please provide valid hex colors in the format #RRGGBB.");
        }

        const startColorInt = hexToInt(startColor);
        const endColorInt = hexToInt(endColor);

        await interaction.guild.roles.edit(userEotmRole, {
            colors: {
                primaryColor: startColorInt,
                secondaryColor: endColorInt
            }
        })

        await interaction.editReply("Your EOTM role color has been updated!")



    }
}