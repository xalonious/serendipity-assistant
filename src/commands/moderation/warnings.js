const { EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");
const Warnings = require("../../schemas/warning");
const roles = require("../../utils/roles");

module.exports = {
  name: "warnings",
  description: "Shows the warnings for a user",
  usage: "<user>",
  rolesRequired: [roles.MR],
  options: [
    {
      name: "user",
      description: "The user whose warnings you want to check",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    await interaction.deferReply();

    const targetUser = interaction.options.getUser("user");

    const targetMember = await interaction.guild.members
      .fetch(targetUser.id)
      .catch(() => null);

    if (!targetMember)
      return interaction.editReply("That user isn't in this server.");

    let doc;
    try {
      doc = await Warnings.findOne({ userid: targetUser.id });
    } catch (err) {
      console.error(err);
      return interaction.editReply("Failed to fetch warnings from the database.");
    }

    if (!doc || !doc.warnings || doc.warnings.length === 0) {
      const noWarnsEmbed = new EmbedBuilder()
        .setTitle(`Warnings for ${targetUser.tag}`)
        .setDescription("✅ This user has no warnings.")
        .setColor("Green")
        .setThumbnail(targetUser.displayAvatarURL());

      return interaction.editReply({ embeds: [noWarnsEmbed] });
    }

    const warnings = doc.warnings;
    const totalWarnings = warnings.length;

    const formattedWarnings = warnings
      .map((w, i) => {
        const ts = w.date ? Math.floor(new Date(w.date).getTime() / 1000) : null;

        return `**${i + 1}.**\n` +
               `**ID:** \`${w.warnid}\`\n` +
               `**Reason:** ${w.reason}\n` +
               `**Moderator:** <@${w.moderatorid}>\n` +
               `**Date:** ${ts ? `<t:${ts}:F>` : "Unknown"}`;
      })
      .join("\n\n");

    const warningsEmbed = new EmbedBuilder()
      .setTitle(`Warnings for ${targetUser.tag}`)
      .setDescription(formattedWarnings)
      .setColor("Yellow")
      .setThumbnail(targetUser.displayAvatarURL())
      .setFooter({ text: `Total warnings: ${totalWarnings}` });

    return interaction.editReply({ embeds: [warningsEmbed] });
  },
};
