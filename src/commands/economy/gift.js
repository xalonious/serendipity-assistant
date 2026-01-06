const economySchema = require("../../schemas/economy");
const { ApplicationCommandOptionType } = require("discord.js");
const items = require("../../utils/getItems");

module.exports = {
  name: "gift",
  description: "Gift someone items",
  usage: "<user> <item> <amount>",
  requiresAccount: true,
  options: [
    {
      name: "user",
      description: "The user you want to gift items to",
      type: ApplicationCommandOptionType.User,
      required: true
    },
    {
      name: "item",
      description: "The item you want to gift",
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: "amount",
      description: "The amount of items you want to gift (default: 1)",
      type: ApplicationCommandOptionType.Integer,
      required: false
    }
  ],

  run: async (client, interaction) => {
    await interaction.deferReply();

    const recipient   = interaction.options.getUser("user");
    const itemInput   = interaction.options.getString("item");
    const amount      = interaction.options.getInteger("amount") || 1;

    if (recipient.id === interaction.user.id)
      return interaction.editReply("You can't gift items to yourself... that's just sad.");
    if (amount < 1)
      return interaction.editReply("Please enter a valid amount of items to gift.");

    const itemDef = items.find(i => i.name.toLowerCase() === itemInput.toLowerCase());
    if (!itemDef)
      return interaction.editReply("That item doesn't exist!");

    const senderDoc    = await economySchema.findOne({ userId: interaction.user.id });
    const recipientDoc = await economySchema.findOne({ userId: recipient.id });
    if (!recipientDoc)
      return interaction.editReply("That user doesn't have an account yet.");

    const senderItem = senderDoc.inventory.find(
      i => i.itemName.toLowerCase() === itemInput.toLowerCase()
    );
    if (!senderItem)
      return interaction.editReply(`You don't have any ${itemInput}(s) to gift!`);
    if (senderItem.quantity < amount)
      return interaction.editReply(
        `You only have ${senderItem.quantity} ${senderItem.itemName}(s), so you can't gift ${amount}.`
      );

    await economySchema.findOneAndUpdate(
      { userId: interaction.user.id },
      { $inc: { "inventory.$[elem].quantity": -amount } },
      { arrayFilters: [{ "elem.itemName": senderItem.itemName }] }
    );

    await economySchema.findOneAndUpdate(
      { userId: interaction.user.id },
      { $pull: { inventory: { itemName: senderItem.itemName, quantity: { $lte: 0 } } } }
    );

    const recipientHas = recipientDoc.inventory.some(
      i => i.itemName.toLowerCase() === itemInput.toLowerCase()
    );
    if (recipientHas) {
      await economySchema.findOneAndUpdate(
        { userId: recipient.id },
        { $inc: { "inventory.$[elem].quantity": amount } },
        { arrayFilters: [{ "elem.itemName": senderItem.itemName }] }
      );
    } else {
      await economySchema.findOneAndUpdate(
        { userId: recipient.id },
        { $push: { inventory: { itemName: senderItem.itemName, quantity: amount } } }
      );
    }

    return interaction.editReply(
      `You’ve gifted **${amount} ${senderItem.itemName}(s)** to **${recipient.username}**!`
    );
  }
};
