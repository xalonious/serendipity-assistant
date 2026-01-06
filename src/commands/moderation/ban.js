const { EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");
const sendLog = require("../../utils/sendLog");
const roles = require("../../utils/roles");
require("dotenv").config();

module.exports = {
  name: "ban",
  description: "Bans a user from the server",
  usage: "<user> [reason]",
  permissionsRequired: [PermissionsBitField.Flags.BanMembers],
  options: [
    {
      name: "user",
      description: "The user who you want to ban",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "reason",
      description: "The reason for the ban",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    await interaction.deferReply();

    const targetUser = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") || "No reason given";

    const targetMember = await interaction.guild.members.fetch(targetUser.id).catch(() => null);

    if (targetMember) {
      if(targetMember.roles.cache.get(roles.MR)) {
        return interaction.editReply("That user is a staff member, I cannot ban them.");
      }
    }

    const bannedEmbed = new EmbedBuilder()
      .setTitle(`You were banned from ${interaction.guild.name}`)
      .addFields(
        { name: "Ban reason", value: reason },
        { name: "Moderator", value: `${interaction.member}` }
      )
      .setColor("Red")
      .setThumbnail(interaction.guild.iconURL());

    let dmFailed = false;
    try {
      await targetUser.send({ embeds: [bannedEmbed] });
    } catch {
      dmFailed = true;
    }

    try {
      await interaction.guild.bans.create(targetUser.id, { reason });

      sendLog(
        client,
        "User banned",
        "Someone was banned from the server",
        [
          { name: "User", value: `${targetUser} (${targetUser.id})` },
          { name: "Reason", value: reason },
          { name: "Responsible moderator", value: `${interaction.member}` },
        ],
        "Red",
        targetUser.displayAvatarURL()
      );

      return interaction.editReply(
        dmFailed
          ? `Successfully banned ${targetUser.tag}, but I couldn't DM them.`
          : `Successfully banned ${targetUser.tag}.`
      );
    } catch (error) {
      console.error(error);
      return interaction.editReply(`Failed to ban ${targetUser.tag}.`);
    }
  },
};
