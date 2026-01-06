const { ApplicationCommandOptionType, AttachmentBuilder } = require('discord.js');
const levelSchema = require('../../schemas/level');
const { getXpNeeded, generateRankCard } = require('../../utils/levelUtils');

module.exports = {
  name: 'rank',
  description: "Check your rank or someone else's rank",
  usage: '<?user>',
  options: [
    {
      name: 'user',
      description: 'The user to check the rank of',
      type: ApplicationCommandOptionType.User,
      required: false
    }
  ],

  run: async (client, interaction) => {
    await interaction.deferReply();

    const target = interaction.options.getUser('user') || interaction.user;
    const userData = await levelSchema.findOne({ userId: target.id });

    if (!userData && target !== interaction.user) {
      return interaction.editReply("This user hasn't earned any XP yet.");
    } else if (!userData) {
      return interaction.editReply("You haven't earned any XP yet. Send messages to gain XP!");
    }

    const allUsers = await levelSchema.find().sort({ level: -1, xp: -1 });
    const rank = allUsers.findIndex(u => u.userId === target.id) + 1;

    const xpNeeded = getXpNeeded(userData.level);

    const buffer = await generateRankCard({
      avatar: target.displayAvatarURL({ extension: 'png', size: 256 }),
      username: target.username,
      level: userData.level,
      xp: userData.xp,
      xpNeeded,
      rank
    });

    const attachment = new AttachmentBuilder(buffer, { name: 'rank.png' });
    return interaction.editReply({ files: [attachment] });
  }
};
