const economySchema = require("../../schemas/economy");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const { search: searchData } = require("../../utils/replies");

const SUCCESS_RATE = 0.6;
const PAYOUT_MIN = 100;
const PAYOUT_MAX = 500;
const CHOICES_SHOWN = 3;
const DECISION_TIMEOUT_MS = 30_000;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const formatMessage = (template, amount) => template.replace("{amount}", String(amount));

module.exports = {
  name: "search",
  description: "Search a place to find some coins",
  cooldown: 60000,
  requiresAccount: true,
  givesxp: true,

  run: async (client, interaction) => {
    await interaction.deferReply();

    const searchLocations = searchData.locations;

    const shuffled = [...searchLocations].sort(() => Math.random() - 0.5);
    const options = shuffled.slice(0, CHOICES_SHOWN);

    const promptEmbed = new EmbedBuilder()
      .setTitle("🔎 Where do you want to search?")
      .setDescription("Pick a location to search for coins:")
      .setColor(0x00AE86);

    const row = new ActionRowBuilder().addComponents(
      options.map((loc) =>
        new ButtonBuilder()
          .setCustomId(`search:${loc.name}`)
          .setLabel(loc.name)
          .setStyle(ButtonStyle.Primary)
      )
    );

    const msg = await interaction.editReply({ embeds: [promptEmbed], components: [row] });

    const filter = (i) => i.user.id === interaction.user.id && i.customId.startsWith("search:");
    let collected;
    try {
      collected = await msg.awaitMessageComponent({
        componentType: ComponentType.Button,
        filter,
        time: DECISION_TIMEOUT_MS
      });
    } catch {
      collected = null;
    }

    if (!collected) {
      return interaction.editReply({
        content: "⏰ You took too long to decide.",
        components: [],
        embeds: []
      });
    }

    const choiceName = collected.customId.split(":")[1];
    const locationData = searchLocations.find((l) => l.name === choiceName) || options[0];

    const didSucceed = Math.random() < SUCCESS_RATE;
    let description;
    let color;

    if (didSucceed) {
      const amount = randInt(PAYOUT_MIN, PAYOUT_MAX);
      const line = pick(locationData.success);
      description = formatMessage(line, amount);
      color = 0x2ecc71;

      await economySchema.findOneAndUpdate(
        { userId: interaction.user.id },
        { $inc: { walletbalance: amount } },
        { upsert: true, new: true }
      );
    } else {
      description = pick(locationData.failure);
      color = 0xe74c3c;
    }

    const result = new EmbedBuilder()
      .setTitle(`📍 ${choiceName}`)
      .setDescription(description)
      .setColor(color);

    await collected.update({ embeds: [result], components: [] });

    interaction.shouldApplyCooldown = true;
  }
};
