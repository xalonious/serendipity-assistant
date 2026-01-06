const economySchema = require("../../schemas/economy");
const {
  ApplicationCommandOptionType,
  ButtonBuilder,
  ActionRowBuilder,
  EmbedBuilder,
  ComponentType,
  MessageFlags
} = require("discord.js");

module.exports = {
  name: "bj",
  description: "Play a game of blackjack to win some coins",
  usage: "<amount>",
  requiresAccount: true,
  givesxp: true,
  cooldown: 30000,
  options: [{
    name: "amount",
    description: "The amount of money you want to bet",
    type: ApplicationCommandOptionType.String,
    required: true
  }],

  run: async (client, interaction) => {
    await interaction.deferReply();

    let amount = interaction.options.getString("amount");
    const userDoc = await economySchema.findOne({ userId: interaction.user.id });

    if (isNaN(amount) && amount !== "all") {
      return interaction.editReply("Please enter a valid number or 'all'.");
    }
    if (amount === "all") amount = userDoc.walletbalance;
    amount = Number(amount);

    if (amount < 250) {
      return interaction.editReply("You need to bet at least 250 coins to play blackjack.");
    }
    if (userDoc.walletbalance < amount) {
      return interaction.editReply(`You only have ${userDoc.walletbalance} coins.`);
    }

    await economySchema.findOneAndUpdate(
      { userId: interaction.user.id },
      { $inc: { walletbalance: -amount } }
    );

    const deck = createShuffledDeck();
    const playerHand = [deck.pop(), deck.pop()];
    const dealerHand = [deck.pop(), deck.pop()];

    const gameEmbed = new EmbedBuilder()
      .setTitle("♠️ Blackjack")
      .setColor("#2F3136")
      .setDescription(`You’ve bet **${amount}** coins\nGood luck!`)
      .setThumbnail("https://tse1.mm.bing.net/th?id=OIP.g8C90-Qsi8DuaE35Em9hhQHaHa&pid=Api&P=0&h=220");

    const hitBtn = new ButtonBuilder().setCustomId("hit").setLabel("Hit").setStyle("Primary");
    const standBtn = new ButtonBuilder().setCustomId("stand").setLabel("Stand").setStyle("Secondary");
    const controls = new ActionRowBuilder().addComponents(hitBtn, standBtn);

    const gameMessage = await interaction.editReply({ embeds: [gameEmbed], components: [controls] });

    const refresh = (hideDealer = true) => {
      const playerScore = calculateHandScore(playerHand);
      const dealerVisible = dealerHand.map((c, i) => (hideDealer && i === 1 ? "🂠" : formatCard(c)));
      gameEmbed.setFields(
        { name: "Your hand",   value: handString(playerHand),  inline: false },
        { name: "Dealer hand", value: dealerVisible.join(" "), inline: false },
        { name: "Your score",  value: String(playerScore),     inline: false }
      );
    };

    const initialScore = calculateHandScore(playerHand);
    if (initialScore === 21) {
      const payout = Math.floor(amount * 2.5); 
      await economySchema.findOneAndUpdate(
        { userId: interaction.user.id },
        { $inc: { walletbalance: payout } }
      );
      refresh(false);
      gameEmbed.setDescription(`🃏 **BLACKJACK!** You win **${payout - amount}** coins!`);
      return gameMessage.edit({ embeds: [gameEmbed], components: [] });
    }

    refresh(true);
    await gameMessage.edit({ embeds: [gameEmbed] });

    const collector = gameMessage.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 120_000
    });

    collector.on("collect", async btnInt => {
      if (btnInt.user.id !== interaction.user.id) {
        return btnInt.reply({ content: "This is not your game!", flags: MessageFlags.Ephemeral });
      }

      if (btnInt.customId === "hit") {
        playerHand.push(deck.pop());
        const score = calculateHandScore(playerHand);
        if (score >= 21) {
          await btnInt.deferUpdate();
          collector.stop();
        } else {
          refresh(true);
          await btnInt.update({ embeds: [gameEmbed] });
        }
      } else if (btnInt.customId === "stand") {
        await btnInt.deferUpdate();
        collector.stop();
      }
    });

    collector.on("end", async (_, reason) => {
      const pScore = calculateHandScore(playerHand);

      if (reason === "time") {
        gameEmbed.setDescription(`⏰ Game expired due to inactivity.\nYou lost **${amount}** coins.`);
      } else {
        while (calculateHandScore(dealerHand) < 17) {
          dealerHand.push(deck.pop());
        }

        const dScore = calculateHandScore(dealerHand);
        let resultText = "";
        let payout = 0;

        if (pScore > 21) {
          resultText = `💥 Bust! You lost **${amount}** coins.`;
        } else if (dScore > 21 || pScore > dScore) {
          resultText = `🎉 You win **${amount * 2}** coins!`;
          payout = amount * 2;
        } else if (pScore < dScore) {
          resultText = `😢 You lost **${amount}** coins.`;
        } else {
          resultText = `🤝 It's a draw. Your **${amount}** coins are returned.`;
          payout = amount;
        }

        if (payout > 0) {
          await economySchema.findOneAndUpdate(
            { userId: interaction.user.id },
            { $inc: { walletbalance: payout } }
          );
        }

        refresh(false);
        gameEmbed.setDescription(resultText);
      }

      const disabledControls = new ActionRowBuilder().addComponents(
        hitBtn.setDisabled(true),
        standBtn.setDisabled(true)
      );

      await gameMessage.edit({ embeds: [gameEmbed], components: [disabledControls] });
    });

    interaction.shouldApplyCooldown = true;
  }
};


function createShuffledDeck() {
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const suits = ["♠️", "♣️", "♥️", "♦️"];
  const deck = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ rank, suit });
    }
  }

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

function calculateHandScore(hand) {
  let score = 0, aces = 0;

  for (const { rank } of hand) {
    if (rank === "A") {
      score += 11;
      aces++;
    } else if (["K", "Q", "J"].includes(rank)) {
      score += 10;
    } else {
      score += parseInt(rank);
    }
  }

  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }

  return score;
}

function formatCard(card) {
  return `${card.rank}${card.suit}`;
}

function handString(hand) {
  return hand.map(formatCard).join(" ");
}
