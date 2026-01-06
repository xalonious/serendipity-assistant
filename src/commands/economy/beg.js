const economySchema = require("../../schemas/economy");
const { beg, CURRENCY } = require("../../utils/replies");

module.exports = {
  name: "beg",
  description: "Beg for some coins",
  cooldown: 60000,
  requiresAccount: true,
  givesxp: true,

  run: async (client, interaction) => {
    await interaction.deferReply();

    const result = Math.random() < 0.6 ? "success" : "failure";
    const user = await economySchema.findOne({ userId: interaction.user.id });

    if (result === "success") {
      const amount = Math.floor(Math.random() * (400 - 100 + 1)) + 100;
      await interaction.editReply(`${CURRENCY} Oh you poor soul, here's **__${amount}__** coins`);
      user.walletbalance += amount;
      await user.save();
    } else {
      const randomResponse = beg.failed[Math.floor(Math.random() * beg.failed.length)];
      await interaction.editReply(randomResponse);
    }

    interaction.shouldApplyCooldown = true;
  }
};
