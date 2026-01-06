const economySchema = require("../../schemas/economy");
const allItems = require("../../utils/getItems");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "sell",
  description: "Sell an item from your inventory",
  usage: "<item> <?quantity>",
  options: [
    {
      name: "item",
      description: "The item you want to sell",
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: true 
    },
    {
      name: "quantity",
      description: "Amount to sell (number or 'all'; default 1)",
      type: ApplicationCommandOptionType.String,
      required: false
    }
  ],

  autocomplete: async (interaction) => {
    try {
      const focused = interaction.options.getFocused(true)?.value?.toLowerCase() || "";

      const user = await economySchema.findOne({ userId: interaction.user.id });
      if (!user || !Array.isArray(user.inventory) || user.inventory.length === 0) {
        return interaction.respond([]);
      }

      const itemByName = new Map(
        allItems.map(i => [i.name.toLowerCase(), i])
      );

      const sellables = user.inventory
        .filter(inv => inv.quantity > 0)
        .map(inv => {
          const meta = itemByName.get(inv.itemName.toLowerCase());
          return meta && meta.sellprice
            ? { name: meta.name, qty: inv.quantity, sellprice: meta.sellprice }
            : null;
        })
        .filter(Boolean);

      const filtered = focused
        ? sellables.filter(s => s.name.toLowerCase().includes(focused))
        : sellables;

      const choices = filtered.slice(0, 25).map(s => ({
        name: `${s.name} — Qty: ${s.qty} • Sell: ${s.sellprice}`,
        value: s.name
      }));

      await interaction.respond(choices);
    } catch (err) {
      try { await interaction.respond([]); } catch {}
    }
  },

  run: async (client, interaction) => {
    await interaction.deferReply();

    const itemName = interaction.options.getString("item");
    let quantity = interaction.options.getString("quantity") || 1;

    if (isNaN(quantity) && quantity !== "all") {
      return interaction.editReply("Please enter a valid number or 'all' to sell all your items.");
    }

    const item = allItems.find(i => i.name.toLowerCase() === itemName.toLowerCase());
    if (!item) return interaction.editReply("That's not a valid item.");
    if (!item.sellprice) return interaction.editReply("That item is not sellable.");

    const user = await economySchema.findOne({ userId: interaction.user.id });
    if (!user) return interaction.editReply("You don't have an account yet.");

    const userItem = user.inventory.find(i => i.itemName.toLowerCase() === itemName.toLowerCase());
    if (!userItem || userItem.quantity <= 0) {
      return interaction.editReply("You don't have that item in your inventory.");
    }

    if (quantity === "all") quantity = userItem.quantity;
    quantity = parseInt(quantity, 10);
    if (quantity < 1) return interaction.editReply("You can't sell less than 1 item.");
    if (userItem.quantity < quantity) {
      return interaction.editReply(`You only have ${userItem.quantity} of those.`);
    }

    const sellPrice = item.sellprice * quantity;
    user.walletbalance += sellPrice;

    if (userItem.quantity === quantity) {
      user.inventory = user.inventory.filter(i => i.itemName.toLowerCase() !== itemName.toLowerCase());
    } else {
      userItem.quantity -= quantity;
    }

    await user.save();
    await interaction.editReply(`You sold ${quantity} ${item.name}(s) for ${sellPrice} coins.`);
  }
};
