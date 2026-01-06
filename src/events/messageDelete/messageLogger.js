const { EmbedBuilder } = require("discord.js");

module.exports = (client, message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const logsChannel = message.guild.channels.cache.get("700785192356282438");
  if (!logsChannel) return;

  try {
    const deletedContent = new EmbedBuilder()
      .setTitle("Deleted Message")
      .addFields(
        { name: "Author", value: `${message.author}` },
        { name: "In", value: `${message.channel}` },
        { name: "Content", value: message.content || "No content" }
      )
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setColor("Random");

    if (message.attachments.size > 0) {
      const attachments = [...message.attachments.values()];

      const attachmentList = attachments
        .map((att, i) => `**${i + 1}.** ${att.url}`)
        .join("\n");

      deletedContent.addFields({
        name: `Attachments (${attachments.length})`,
        value: attachmentList,
      });

      deletedContent.setImage(attachments[0].url);
    }

    logsChannel.send({ embeds: [deletedContent] });
  } catch (e) {
    return;
  }
};
