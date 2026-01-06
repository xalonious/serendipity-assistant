const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, AttachmentBuilder } = require("discord.js");

module.exports = {
    name: 'sendreactionroles',
    description: 'Send the reaction roles message',
    devOnly: true,

    run: async(client, interaction) => {

        await interaction.deferReply();

        const rrEmbedPronouns = new EmbedBuilder()
        .setTitle("Pronoun Roles")
        .setDescription("Press the buttons below to get your pronoun roles! You may press again to remove the role.")

        const rrEmbedNotifications = new EmbedBuilder()
        .setTitle("Notification Roles")
        .setDescription("Press the buttons below to get your notification roles! You may press again to remove the role.")

        const rrEmbedTimezones = new EmbedBuilder()
        .setTitle("Timezone Roles")
        .setDescription("Press the buttons below to get your timezone roles! You may press again to remove the role.")

        const rrEmbedTimeZonesExtra = new EmbedBuilder()
        .setTitle("Additional timezone hours")
        .setDescription("If your exact timezone isn’t listed above, react to the + hour(s) your timezone has to receive the role! (Ex. GMT+1)")

        const rrEmbedColors = new EmbedBuilder()
        .setTitle("Color Roles")
        .setDescription("Press the buttons below to get your color roles! You may press again to remove the role.")

        const rrButtonsPronouns = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId("he/him").setLabel("He/Him").setStyle(ButtonStyle.Primary).setEmoji("🐶"),
            new ButtonBuilder().setCustomId("she/her").setLabel("She/Her").setStyle(ButtonStyle.Primary).setEmoji("🐱"),
            new ButtonBuilder().setCustomId("they/them").setLabel("They/Them").setStyle(ButtonStyle.Primary).setEmoji("🐻"),
            new ButtonBuilder().setCustomId("they/she").setLabel("They/She").setStyle(ButtonStyle.Primary).setEmoji("🐰"),
        )

        const rrButtonsPronouns2 = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId("they/he").setLabel("They/He").setStyle(ButtonStyle.Primary).setEmoji("🐺"),
            new ButtonBuilder().setCustomId("he/they").setLabel("He/They").setStyle(ButtonStyle.Primary).setEmoji("🐸"),
            new ButtonBuilder().setCustomId("she/they").setLabel("She/They").setStyle(ButtonStyle.Primary).setEmoji("🐵"),
            new ButtonBuilder().setCustomId("ask").setLabel("Ask for pronouns").setStyle(ButtonStyle.Primary).setEmoji("🐷")
        )

        const rrButtonsPronouns3 = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId("any").setLabel("Any pronouns").setStyle(ButtonStyle.Primary).setEmoji("🐮"),
            new ButtonBuilder().setCustomId("it/itself").setLabel("It/Itself").setStyle(ButtonStyle.Primary).setEmoji("🐨")   
        )

        
        const rrButtonsPings = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId("alliances").setLabel("Alliances").setStyle(ButtonStyle.Primary).setEmoji("🤝"),
            new ButtonBuilder().setCustomId("important").setLabel("Important").setStyle(ButtonStyle.Primary).setEmoji("❗"),
            new ButtonBuilder().setCustomId("shift").setLabel("Shift").setStyle(ButtonStyle.Primary).setEmoji("😃"),
            new ButtonBuilder().setCustomId("qotd").setLabel("QOTD").setStyle(ButtonStyle.Primary).setEmoji("⁉️")
        )

        const rrButtonsPings2 = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId("training").setLabel("Training").setStyle(ButtonStyle.Primary).setEmoji("⌛"),
            new ButtonBuilder().setCustomId("giveaway").setLabel("Giveaway").setStyle(ButtonStyle.Primary).setEmoji("🎉"),
            new ButtonBuilder().setCustomId("clothing").setLabel("Clothing").setStyle(ButtonStyle.Primary).setEmoji("👚"),
            new ButtonBuilder().setCustomId("awareness").setLabel("Awareness").setStyle(ButtonStyle.Primary).setEmoji("🧠")
        )

        const rrButtonsPings3 = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId("socialmedia").setLabel("Social Media").setStyle(ButtonStyle.Primary).setEmoji("📱"),
            new ButtonBuilder().setCustomId("events").setLabel("Events").setStyle(ButtonStyle.Primary).setEmoji("🎮"),
        )

        const rrButtonsTimezones = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId("aest").setLabel("AEST").setStyle(ButtonStyle.Primary).setEmoji("🩶"),
            new ButtonBuilder().setCustomId("bst").setLabel("BST").setStyle(ButtonStyle.Primary).setEmoji("❤️"),
            new ButtonBuilder().setCustomId("cet").setLabel("CET").setStyle(ButtonStyle.Primary).setEmoji("🧡"),
            new ButtonBuilder().setCustomId("cst").setLabel("CST").setStyle(ButtonStyle.Primary).setEmoji("💛")
        )

        const rrButtonsTimezones2 = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId("est").setLabel("EST").setStyle(ButtonStyle.Primary).setEmoji("💚"),
            new ButtonBuilder().setCustomId("eest").setLabel("EEST").setStyle(ButtonStyle.Primary).setEmoji("💙"),
            new ButtonBuilder().setCustomId("eet").setLabel("EET").setStyle(ButtonStyle.Primary).setEmoji("💜"),
            new ButtonBuilder().setCustomId("gmt").setLabel("GMT").setStyle(ButtonStyle.Primary).setEmoji("🩷")
        )

        const rrButtonsTimezones3 = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId("mdt").setLabel("MDT").setStyle(ButtonStyle.Primary).setEmoji("🤎"),
            new ButtonBuilder().setCustomId("pst").setLabel("PST").setStyle(ButtonStyle.Primary).setEmoji("🤍"),
        )

        const rrButtonsTimezonesExtra = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId("+1").setLabel("+1").setStyle(ButtonStyle.Primary).setEmoji("<:one:1362407087140900974>"),
            new ButtonBuilder().setCustomId("+2").setLabel("+2").setStyle(ButtonStyle.Primary).setEmoji("<:two:1362407094078144696>"),
            new ButtonBuilder().setCustomId("+3").setLabel("+3").setStyle(ButtonStyle.Primary).setEmoji("<:three:1362407091389726730>"),
            new ButtonBuilder().setCustomId("+4").setLabel("+8").setStyle(ButtonStyle.Primary).setEmoji("<:eight:1362407085014384802>")
        )

        const rrButtonColors = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId("red").setLabel("Red").setStyle(ButtonStyle.Primary).setEmoji("<:red_heart:1332427721074147409>"),
            new ButtonBuilder().setCustomId("orange").setLabel("Orange").setStyle(ButtonStyle.Primary).setEmoji("<:orange_bow:1108185270563655700>"),
            new ButtonBuilder().setCustomId("yellow").setLabel("Yellow").setStyle(ButtonStyle.Primary).setEmoji("<:yellow_macaron:1268623145187803238>"),
            new ButtonBuilder().setCustomId("green").setLabel("Green").setStyle(ButtonStyle.Primary).setEmoji("<:green_leaf:1098829153182167040>")
        )

        const rrButtonColors2 = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId("blue").setLabel("Blue").setStyle(ButtonStyle.Primary).setEmoji("<:blue_flower:1082869162940043325>"),
            new ButtonBuilder().setCustomId("pink").setLabel("Pink").setStyle(ButtonStyle.Primary).setEmoji("<:pink_butterfly:1348074927202500731>"),
            new ButtonBuilder().setCustomId("purple").setLabel("Purple").setStyle(ButtonStyle.Primary).setEmoji("<:purple_hearts:1108185193052909608>"),
            new ButtonBuilder().setCustomId("black").setLabel("Black").setStyle(ButtonStyle.Primary).setEmoji("<:black_ribbon:1268623893292384306>")
        )

        const rrButtonColors3 = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId("gray").setLabel("Gray").setStyle(ButtonStyle.Primary).setEmoji("<:gray_cloud:1348498879267733575>"),
            new ButtonBuilder().setCustomId("beige").setLabel("Beige").setStyle(ButtonStyle.Primary).setEmoji("<:brown_bunnies:1348074983431340074>"),
            new ButtonBuilder().setCustomId("white").setLabel("White").setStyle(ButtonStyle.Primary).setEmoji("<:white_stars:1173011051726520360>"),
            new ButtonBuilder().setCustomId("raspberry").setLabel("Raspberry").setStyle(ButtonStyle.Primary).setEmoji("<:raspberry:1371538077528489994>")
        )

        const rrButtonColors4 = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId("teal").setLabel("Teal").setStyle(ButtonStyle.Primary).setEmoji("<:teal:1371538079172788406>"),
            new ButtonBuilder().setCustomId("navy").setLabel("Navy").setStyle(ButtonStyle.Primary).setEmoji("<:navy_star:1446205441972375562>")

        )

        const rrChannel = interaction.guild.channels.cache.get("696046088561360987")
        const rrColors = interaction.guild.channels.cache.get("1048368751734702131")


        const rrBanner = new AttachmentBuilder(`${__dirname}/../../../images/ssc_roles_banner.png`);
        await rrChannel.send({ files: [rrBanner] })
        await rrColors.send({ files: [rrBanner] })

        await rrChannel.send({ embeds: [rrEmbedPronouns], components: [rrButtonsPronouns, rrButtonsPronouns2, rrButtonsPronouns3] })
        await rrChannel.send({ embeds: [rrEmbedNotifications], components: [rrButtonsPings, rrButtonsPings2, rrButtonsPings3] })
        await rrChannel.send({ embeds: [rrEmbedTimezones], components: [rrButtonsTimezones, rrButtonsTimezones2, rrButtonsTimezones3] })
        await rrChannel.send({ embeds: [rrEmbedTimeZonesExtra], components: [rrButtonsTimezonesExtra] })
        await rrColors.send({ embeds: [rrEmbedColors], components: [rrButtonColors, rrButtonColors2, rrButtonColors3, rrButtonColors4] })


        await interaction.editReply({ content: "Reaction roles sent!", Flags: MessageFlags.Ephemeral })
    }
}