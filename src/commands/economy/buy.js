const economySchema = require("../../schemas/economy");
const shopItems = require("../../utils/getItems");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "buy",
  description: "Buy an item from the shop",
  usage: "<item> <?amount>",
  requiresAccount: true,

  options: [
    {
      name: "item",
      description: "The item you want to buy",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: shopItems
        .filter(i => i.inShop)
        .map(i => ({
          name: `${i.name} (${i.buyprice} coins)`,
          value: i.name
        }))
    },
    {
      name: "quantity",
      description: "How many you want to buy (default: 1)",
      type: ApplicationCommandOptionType.Integer,
      required: false
    }
  ],

  run: async (client, interaction) => {
    await interaction.deferReply();

    const item = interaction.options.getString("item");
    const quantity = interaction.options.getInteger("quantity") || 1;

    const existingUser = await economySchema.findOne({ userId: interaction.user.id });
    const shopItem = shopItems.find(i => i.name === item && i.inShop);

    if (!shopItem) {
      return interaction.editReply("That item doesn't exist in the shop.");
    }

    const totalCost = shopItem.buyprice * quantity;
    if (existingUser.walletbalance < totalCost) {
      return interaction.editReply("You don't have enough coins to buy that item.");
    }

    const inventoryItem = existingUser.inventory.find(i => i.itemName === shopItem.name);
    if (inventoryItem) {
      inventoryItem.quantity += quantity;
    } else {
      existingUser.inventory.push({ itemName: shopItem.name, quantity });
    }

    existingUser.walletbalance -= totalCost;
    await existingUser.save();

    await interaction.editReply(
      `You have successfully bought ${quantity} ${shopItem.name}(s) for ${shopItem.buyprice * quantity} coins.`
    );
  }
};
