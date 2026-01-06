const economySchema = require('../../schemas/economy');
const items = require('../../utils/getItems');
const { EmbedBuilder, ApplicationCommandOptionType} = require('discord.js');
module.exports = {
    name: "inv",
    description: "Displays your inventory",
    usage: "<?user>",
    requiresAccount: true,
    options: [
        {
            name: "user",
            description: "The user you want to view the inventory of",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],

    run: async(client, interaction) => {
        await interaction.deferReply();

        const user = interaction.options.getUser("user") || interaction.user;

        const existingUser = await economySchema.findOne({ userId: user.id });

        let replyString;

        if(!existingUser) {
            return interaction.editReply("That user doesn't have an account yet");
        }

        if(user.id !== interaction.user.id) {
            replyString = "That user doesn't have anything in their inventory";
        } else {
            replyString = "You don't have anything in your inventory";
        }

        if (!existingUser.inventory.length) {
            return await interaction.editReply(replyString);
        }

        const sortedInventory = existingUser.inventory.sort((a, b) => a.itemName.localeCompare(b.itemName));

        const inventoryEmbed = new EmbedBuilder()
        .setTitle(`${user.username}'s inventory`)
        .setColor("Blurple")
        .setDescription(
            sortedInventory.map((item) => {
                const itemData = items.find(i => i.name === item.itemName);
                return `${itemData.emoji} **${item.itemName}** - ${item.quantity}`
            }).join("\n")
        )
        .setThumbnail(client.user.displayAvatarURL())

        await interaction.editReply({ embeds: [inventoryEmbed] });
    }
}