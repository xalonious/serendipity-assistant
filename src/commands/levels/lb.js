const levelSchema = require("../../schemas/level");
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "lb",
  description: "Shows the level leaderboard",

  run: async (client, interaction) => {
    await interaction.deferReply();

    const allUsers = await levelSchema.find().sort({ level: -1, xp: -1 });
    if (!allUsers.length) {
      return interaction.editReply("No users found in the leaderboard.");
    }

    const perPage = 10;
    let page = 0;
    const maxPages = Math.ceil(allUsers.length / perPage);

    const generateEmbed = (pageIndex) => {
      const start = pageIndex * perPage;
      const sliced = allUsers.slice(start, start + perPage);

      const medalEmojis = ["🥇", "🥈", "🥉"];
      const description = sliced
        .map((u, i) => {
          const rank = start + i;
          const emoji = medalEmojis[rank] || `**${rank + 1}.**`;
          return `${emoji} <@${u.userId}> — Level: \`${u.level}\` | XP: \`${u.xp}\``;
        })
        .join("\n");

      return new EmbedBuilder()
        .setTitle("📊 Level Leaderboard")
        .setColor("Blurple")
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setFooter({ text: `Page ${pageIndex + 1}/${maxPages} • Keep chatting to climb the ranks!` })
        .setDescription(description);
    };

    const backBtn = new ButtonBuilder()
      .setCustomId("back")
      .setEmoji("◀️")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(true); 

    const nextBtn = new ButtonBuilder()
      .setCustomId("next")
      .setEmoji("▶️")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(maxPages <= 1);

    const row = new ActionRowBuilder().addComponents(backBtn, nextBtn);

    const message = await interaction.editReply({
      embeds: [generateEmbed(page)],
      components: [row],
    });

    const collector = message.createMessageComponentCollector({
      filter: (btnInt) => btnInt.user.id === interaction.user.id,
      time: 60_000,
    });

    collector.on("collect", async (btnInt) => {
      if (btnInt.customId === "back" && page > 0) page--;
      if (btnInt.customId === "next" && page < maxPages - 1) page++;

      backBtn.setDisabled(page === 0);
      nextBtn.setDisabled(page === maxPages - 1);

      await btnInt.update({
        embeds: [generateEmbed(page)],
        components: [new ActionRowBuilder().addComponents(backBtn, nextBtn)],
      });
    });

    collector.on("end", async () => {
      backBtn.setDisabled(true);
      nextBtn.setDisabled(true);
      await message.edit({ components: [new ActionRowBuilder().addComponents(backBtn, nextBtn)] });
    });
  },
};
