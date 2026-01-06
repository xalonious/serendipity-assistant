const economySchema = require("../../schemas/economy");
const { crime } = require("../../utils/replies"); 

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const fmt = (t, amount) => t.replace("{amount}", String(amount));

module.exports = {
  name: "crime",
  description: "Commit a crime to get some money",
  requiresAccount: true,
  givesxp: true,
  cooldown: 120000,

  run: async (client, interaction) => {
    await interaction.deferReply();

    const existingUser = await economySchema.findOne({ userId: interaction.user.id });
    const isSuccess = Math.random() < 0.4;

    let amount;

    if (isSuccess) {
      amount = Math.floor(Math.random() * (1500 - 250 + 1)) + 250;

      await economySchema.findOneAndUpdate(
        { userId: interaction.user.id },
        { $inc: { walletbalance: amount } }
      );

      const line = pick(crime.success);
      await interaction.editReply(fmt(line, amount));
    } else {
      amount = Math.floor(existingUser.walletbalance * (Math.random() * 0.10));
      amount = Math.min(amount, 7500);

      await economySchema.findOneAndUpdate(
        { userId: interaction.user.id },
        { $inc: { walletbalance: -amount } }
      );

      const line = pick(crime.failure);
      await interaction.editReply(fmt(line, amount));
    }

    interaction.shouldApplyCooldown = true;
  },
};
