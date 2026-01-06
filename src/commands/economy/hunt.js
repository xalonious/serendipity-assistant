const economySchema = require("../../schemas/economy");

module.exports = {
  name: "hunt",
  description: "hunt to catch some animals",
  requiresAccount: true,
  givesxp: true,
  cooldown: 120000,

  run: async (client, interaction) => {
    await interaction.deferReply();

    const userDocument = await economySchema.findOne({ userId: interaction.user.id });

    if (!userDocument?.inventory?.find(i => i.itemName === "Hunting Rifle")) {
      return interaction.editReply("You need a hunting rifle to hunt.. you're not good enough to catch animals with your bare hands");
    }

    const lostHuntingRifle = Math.random() < 0.03;

    if (lostHuntingRifle) {
      const itemIndex = userDocument.inventory.findIndex(i => i.itemName === "Hunting Rifle");
      if (itemIndex !== -1) {
        userDocument.inventory[itemIndex].quantity -= 1;
        if (userDocument.inventory[itemIndex].quantity <= 0) {
          userDocument.inventory.splice(itemIndex, 1);
        }
        await userDocument.save();
      }
      return interaction.editReply("You were attacked by a brown bear and barely escaped with your life... the bear ate your hunting rifle though.. you're gonna have to buy another now...");
    }
    const r = Math.random();
    let itemCaught;

    if (r < 0.18) {
      itemCaught = "nothing";
    } else if (r < 0.18 + 0.27) {
      itemCaught = "Duck";
    } else if (r < 0.18 + 0.27 + 0.18) {
      itemCaught = "Skunk";
    } else if (r < 0.18 + 0.27 + 0.18 + 0.18) {
      itemCaught = "Boar";
    } else if (r < 0.18 + 0.27 + 0.18 + 0.18 + 0.12) {
      itemCaught = "Deer";
    } else {
      itemCaught = "Bear";
    }

    let replyString;

    if (itemCaught === "Skunk") {
      const skunkEscapeRoll = Math.random();
      if (skunkEscapeRoll < 0.30) {
        itemCaught = "nothing";
        replyString = "You tried to catch a skunk, but it farted on you and escaped! You smell terrible now pls take a shower";
      } else {
        replyString = "You caught a skunk! 🦨";
      }
    }

    if (!replyString) {
      switch (itemCaught) {
        case "nothing":
          replyString = "You couldn't find anything to hunt... maybe next time!";
          break;
        case "Duck":
          replyString = "You caught a duck! 🦆 Quack!";
          break;
        case "Boar":
          replyString = "You took down a wild boar! 🐗";
          break;
        case "Deer":
          replyString = "You hunted a graceful deer! 🦌";
          break;
        case "Bear":
          replyString = "You encountered a bear... and somehow won! 🐻🔥";
          break;
      }
    }

    if (itemCaught !== "nothing") {
      const itemIndex = userDocument.inventory.findIndex(i => i.itemName === itemCaught);
      if (itemIndex === -1) {
        userDocument.inventory.push({ itemName: itemCaught, quantity: 1 });
      } else {
        userDocument.inventory[itemIndex].quantity += 1;
      }
      await userDocument.save();
    }

    await interaction.editReply(replyString);
    interaction.shouldApplyCooldown = true;
  }
};
