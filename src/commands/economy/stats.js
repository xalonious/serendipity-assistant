const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const economySchema = require("../../schemas/economy");
const { CURRENCY } = require("../../utils/replies");

module.exports = {
    name: "stats",
    description: "Check your or someone else's stats",
    usage: "<?user>",
    requiresAccount: true,
    options: [
        {
            name: "user",
            description: "The user you want to see the stats of",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],

    run: async(client, interaction) => {

        await interaction.deferReply();

        const user = interaction.options.getUser("user") || interaction.user;

        const existingUser = await economySchema.findOne({ userId: user.id });

        if(!existingUser) return interaction.editReply("That user doesn't have an account yet");

        const balEmbed = new EmbedBuilder()
        .setTitle(`${user.username}'s stats`)
        .setDescription(`**${convertToRomanNumeral(existingUser.levels.level)} | Level ${existingUser.levels.level}** \n <:xp:1371147204160655420> ${existingUser.levels.xp}/${existingUser.levels.xpneeded} \n\n ${CURRENCY} | Total Balance: ${existingUser.walletbalance + existingUser.bankbalance} \n <:wallet:1371147238192975933> | Wallet Balance: ${existingUser.walletbalance} \n :bank: | Bank Balance: ${existingUser.bankbalance}/${existingUser.bankcapacity}`)
        .setColor("Random")
        .setThumbnail(user.displayAvatarURL(), { dynamic: true })
        .setFooter({ text: "you poor lmao"})

        
        await interaction.editReply({ embeds: [balEmbed] });
    }
}


    function convertToRomanNumeral(num) {
        const romanNumerals = {
            M: 1000,
            CM: 900,
            D: 500,
            CD: 400,
            C: 100,
            XC: 90,
            L: 50,
            XL: 40,
            X: 10,
            IX: 9,
            V: 5,
            IV: 4,
            I: 1
        };
        let result = "";
        for (const key in romanNumerals) {
            const value = romanNumerals[key];
            result += key.repeat(Math.floor(num / value));
            num %= value;
        }
        return result;
    }

    