const economySchema = require("../../schemas/economy");
const { work } = require("../../utils/replies");

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const fmt = (t, amount) => t.replace("{amount}", String(amount));

module.exports = {
  name: "work",
  description: "Work to earn some money",
  requiresAccount: true,
  givesxp: true,
  cooldown: 300000, 

  run: async (client, interaction) => {
    await interaction.deferReply();

    const amount = Math.floor(Math.random() * (800 - 150 + 1)) + 150;
    const user = await economySchema.findOne({ userId: interaction.user.id });

    user.walletbalance += amount;
    await user.save();

    const response = pick(work.success);
    await interaction.editReply(fmt(response, amount));

    interaction.shouldApplyCooldown = true;
  }
};
