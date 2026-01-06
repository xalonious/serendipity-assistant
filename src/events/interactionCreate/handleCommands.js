require("dotenv").config();
const dev = process.env.DEV_ID;
const getLocalCommands = require("../../utils/getLocalCommands");
const economySchema = require("../../schemas/economy");
const cooldowns = new Map();
const { MessageFlags } = require("discord.js");

module.exports = async (client, interaction) => {
  if (interaction.isAutocomplete()) {
    try {
      const localCommands = getLocalCommands();
      const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);

      if (commandObject?.autocomplete) {
        await commandObject.autocomplete(interaction); 
      } else {
        await interaction.respond([]); 
      }
    } catch (err) {
      console.error("autocomplete error:", err);
      try { await interaction.respond([]); } catch {}
    }
    return;
  }

  if (!interaction.isChatInputCommand()) return;

  const testmode = false;
  if (testmode && interaction.user.id !== dev)
    return interaction.reply("The bot is currently in test mode, pls try again later");

  const localCommands = getLocalCommands();
  const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);
  if (!commandObject) return;

  const userId = interaction.user.id;
  const commandName = interaction.commandName;
  const now = Date.now();
  const cooldownKey = `${commandName}_${userId}`;
  const commandCooldown = commandObject.cooldown || 0;

  if (cooldowns.has(cooldownKey)) {
    const expirationTime = cooldowns.get(cooldownKey);
    if (now < expirationTime) {
      const timeLeft = Math.round((expirationTime - now) / 1000);
      return interaction.reply(`Please wait ${timeLeft} more second(s) before using \`${commandName}\` again.`);
    }
  }

  if (commandObject.devOnly && interaction.user.id !== dev) {
    return interaction.reply("Only the developer is able to use this command.");
  }

  if (commandObject.permissionsRequired?.every((p) => !interaction.member.permissions.has(p))) {
    return interaction.reply({ content: "You do not have permission to run that command!", flags: MessageFlags.Ephemeral });
  }

  if (
    commandObject.rolesRequired?.length > 0 &&
    !interaction.member.roles.cache.some((role) => commandObject.rolesRequired.includes(role.id))
  ) {
    return interaction.reply({ content: "You do not have permission to run that command!", flags: MessageFlags.Ephemeral });
  }

  if (commandObject.requiresAccount) {
    const existingUser = await economySchema.findOne({ userId: interaction.user.id });
    if (!existingUser) {
      const newUser = new economySchema({
        userId: interaction.user.id,
        levels: { level: 1, xp: 0, xpneeded: 100 },
        inventory: []
      });
      await newUser.save();
    }
  }

  try {
    await commandObject.run(client, interaction);

    if (interaction.shouldApplyCooldown) {
      if (commandObject.givesxp) {
        const user = await economySchema.findOne({ userId: interaction.user.id });
        user.levels.xp += 5;
    if (user.levels.xp >= user.levels.xpneeded) {

      const oldLevel = user.levels.level;

      user.levels.level += 1;
      user.levels.xp = 0;
      user.levels.xpneeded = parseInt(user.levels.xpneeded * 1.1);
      user.bankcapacity = parseInt(user.bankcapacity * 1.4);

      const reward = 500 + (oldLevel ** 2) * 20;
      user.walletbalance += reward;

      await interaction.followUp(
        `Congrats ${interaction.member}! You leveled up to level ${user.levels.level}! Your bankspace has been increased by 40%! You earned **${reward} coins**!`
      );
    }

    await user.save();
      }
      cooldowns.set(cooldownKey, now + commandCooldown);
    }
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      interaction.followUp(`There was an error while running this command. ${error}`);
    } else interaction.reply(`There was an error while running this command. ${error}`);
  }
};
