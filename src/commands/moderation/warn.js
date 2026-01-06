const { EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");
const sendLog = require("../../utils/sendLog");
const Warnings = require("../../schemas/warning"); 
const crypto = require("crypto");
const roles = require("../../utils/roles");
require("dotenv").config();

function makeWarnId(length = 8) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);
}

module.exports = {
  name: "warn",
  description: "Warns a user in the server",
  usage: "<user> <reason>",
  rolesRequired: [roles.MR],
  options: [
    {
      name: "user",
      description: "The user who you want to warn",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "reason",
      description: "The reason for the warning",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    await interaction.deferReply();

    const targetUser = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");

    const targetMember = await interaction.guild.members.fetch(targetUser.id).catch(() => null);

    if (!targetMember) return interaction.editReply("That user isn't in this server.");
    if (targetUser.bot) return interaction.editReply("You cannot warn bots.");
    if (targetUser.id === interaction.user.id) return interaction.editReply("You cannot warn yourself.");
    if (targetUser.id === interaction.guild.ownerId) return interaction.editReply("You cannot warn the server owner.");

    if (targetMember) {
      if(targetMember.roles.cache.get(roles.MR)) {
        return interaction.editReply("That user is a staff member, I cannot ban them.");
      }
    }

    const warnId = makeWarnId(8);

    let doc;
    try {
      doc = await Warnings.findOneAndUpdate(
     { userid: targetUser.id },
      {
    $push: {
      warnings: {
        warnid: warnId,
        moderatorid: interaction.user.id,
        reason,
        date: new Date(), 
      },
    },
  },
  { new: true, upsert: true }
);
    } catch (error) {
      console.error(error);
      return interaction.editReply("Failed to save the warning to the database.");
    }

    const totalWarnings = doc.warnings.length; 

    const warnedEmbed = new EmbedBuilder()
      .setTitle(`You were warned in ${interaction.guild.name}`)
      .addFields(
        { name: "Warn reason", value: reason },
        { name: "Total warnings", value: `${totalWarnings}` }
      )
      .setColor("Red")
      .setThumbnail(interaction.guild.iconURL())
      .setFooter({ text: "Please adhere to the server rules to avoid further action." });

    let dmFailed = false;
    try {
      await targetUser.send({ embeds: [warnedEmbed] });
    } catch {
      dmFailed = true;
    }

    sendLog(
      client,
      "User warned",
      "Someone was warned in the server",
      [
        { name: "User", value: `${targetUser} (${targetUser.id})` },
        { name: "Reason", value: reason },
        { name: "Warn ID", value: warnId },
        { name: "Total warnings", value: `${totalWarnings}` },
        { name: "Responsible moderator", value: `${interaction.member}` },
      ],
      "Yellow",
      targetUser.displayAvatarURL()
    );

    return interaction.editReply(
      dmFailed
        ? `Successfully warned ${targetUser.tag}, but I couldn't DM them. They now have ${totalWarnings} warning(s).`
        : `Successfully warned ${targetUser.tag}. They now have ${totalWarnings} warning(s).`
    );
  },
};
