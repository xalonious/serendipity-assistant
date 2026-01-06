const { EmbedBuilder } = require("discord.js");

module.exports = (client, title, description, fields, color, thumbnail) => {
    const logsChannel = client.channels.cache.get("696047701350940823");
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .addFields(fields)
        .setColor(color)
        .setThumbnail(thumbnail);

    logsChannel.send({ embeds: [embed] });
}