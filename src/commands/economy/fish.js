const economySchema = require("../../schemas/economy");

module.exports = {
  name: "fish",
  description: "fish to catch some fish...",
  requiresAccount: true,
  givesxp: true,
  cooldown: 120000,

  run: async (client, interaction) => {
    await interaction.deferReply();

    const userDocument = await economySchema.findOne({ userId: interaction.user.id });

    if (!userDocument?.inventory?.find(i => i.itemName === "Fishing Rod")) {
      return interaction.editReply("You need a fishing rod to fish.. you're not good enough to catch them with your bare hands");
    }

    const droppedFishingPole = Math.random() < 0.03;

    if (droppedFishingPole) {
      const itemIndex = userDocument.inventory.findIndex(i => i.itemName === "Fishing Rod");
      if (itemIndex !== -1) {
        userDocument.inventory[itemIndex].quantity -= 1;
        if (userDocument.inventory[itemIndex].quantity <= 0) {
          userDocument.inventory.splice(itemIndex, 1);
        }
        await userDocument.save();
      }
      return interaction.editReply("STOOPID!!! You dropped your fishing rod in the water... you're gonna have to buy another now...");
    }

    const r = Math.random();
    let itemCaught;

    if (r < 0.218) {
      itemCaught = "nothing";
    } else if (r < 0.218 + 0.200) {
      itemCaught = "Garbage";
    } else if (r < 0.218 + 0.200 + 0.380) {
      itemCaught = "Fish";
    } else if (r < 0.218 + 0.200 + 0.380 + 0.120) {
      itemCaught = "Rare Fish";
    } else if (r < 0.218 + 0.200 + 0.380 + 0.120 + 0.080) {
      itemCaught = "Shark";
    } else {
      itemCaught = "Tek"; 
    }

    let replyString;

    switch (itemCaught) {
      case "nothing":
        replyString = "You didn't catch anything... better luck next time";
        break;
      case "Garbage":
        replyString = "You caught some garbage... ew... 🗑️";
        break;
      case "Fish":
        replyString = "You caught a fish! 🐟";
        break;
      case "Rare Fish":
        replyString = "You caught a rare fish! 🐠";
        break;
      case "Shark":
        replyString = "You caught a shark! 🦈";
        break;
      case "Tek":
        replyString = "you caught... tek? what the hell is tek doing at the bottom of the ocean <:tek:1371147199995580547>";
        break;
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
