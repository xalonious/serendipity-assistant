const sendLog = require("../../utils/sendLog");
const { PermissionsBitField } = require("discord.js");

module.exports = async (client, message) => {
  if (message.author.bot) return;

  if(message.member.permissions.has(PermissionsBitField.Flags.EmbedLinks)) return;

  const whitelistedChannels = ["696042162001019030", "697193725394419733", "708484069909856359"]; // advertising, art, pets 
  if (whitelistedChannels.includes(message.channel.id)) return;

  if(message.channel.name.startsWith("ticket-")) return;

  const allowedDiscordLinkRegex =
    /https?:\/\/(?:ptb\.|canary\.)?discord\.com\/channels\/\d+\/\d+(?:\/\d+)?/gi;

  const commonTlds = [
    "com","net","org","gg","co","xyz",
    "io","ai","dev","app","me","info","biz",
    "edu","gov",
    "uk","us","ca","de","fr","nl","be","es","it","pt",
    "ru","pl","se","no","fi","dk","ie","ch","at",
    "jp","kr","cn","in","br","au","nz"
  ];
  const tldPattern = commonTlds.join("|");

  const linkRegex = new RegExp(
    String.raw`(?:https?:\/\/|www\.)[^\s]+` +
    String.raw`|` +
    String.raw`(?:\b[a-z0-9-]+\.)+(?:${tldPattern})(?:\/[^\s]*)?`,
    "i"
  );

  if (!linkRegex.test(message.content)) return;

  const contentWithoutAllowed = message.content.replace(allowedDiscordLinkRegex, " ");

  if (linkRegex.test(contentWithoutAllowed)) {
    await message.delete();

    const alert = await message.channel.send(
      `${message.member} You are not allowed to post links.`
    );
    setTimeout(() => alert.delete().catch(() => {}), 5000);

    sendLog(
      client,
      "Anti-Link System",
      "A message containing a link was automatically deleted by automod.",
      [
        { name: "Author", value: `${message.author} (${message.author.id})` },
        { name: "In", value: `${message.channel}` },
        { name: "Content", value: message.content }
      ],
      "Red",
      message.member.displayAvatarURL({ dynamic: true })
    );
  }
};
