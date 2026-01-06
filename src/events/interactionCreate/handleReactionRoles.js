const { MessageFlags } = require("discord.js")
module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;

    const { customId, member } = interaction;

    const roles = {
        "he/him": "864944181242626086",
        "she/her": "864944106278092871",
        "they/them": "864944269642432512",
        "they/she": "870018247871836252",
        "they/he": "870018360736378880",
        "he/they": "870020569578483723",
        "she/they": "870019941175263232",
        "ask": "870018152338186250",
        "any": "870020764517158965",
        "it/itself": "870989891390013451",
        "alliances": "787058654989516860",
        "important": "696049440062177361",
        "shift": "696049412862115921",
        "qotd": "1113859813336694804",
        "training": "696049333765931089",
        "giveaway": "1054442414900785202",
        "clothing": "850786159654469632",
        "awareness": "1154918330977755278",
        "socialmedia": "1166785959644385320",
        "events": "1205754837338431528",
        "aest": "1099812869333323896",
        "bst": "1099813001248387193",
        "cet": "1099813034945433680",
        "cst": "1099813071729475584",
        "est": "1099813112653299844",
        "eest": "1099813228369944718",
        "eet": "1099813262658392235",
        "gmt": "1099813297374642216",
        "mdt": "1099813337308606544",
        "pst": "1099813378194686064",
        "+1": "1099813420624261231",
        "+2": "1099813456405856346",
        "+3": "1099813480078524486",
        "+8": "1099813510189432912",
        "red": "1268625283142123725",
        "orange": "1268625288871542865",
        "yellow": "1268625297205362698",
        "green": "1268625312854446100",
        "blue": "1268625320098005155",
        "pink": "1268625327911862334",
        "purple": "1268625334169763840",
        "black": "1348495634964938792",
        "gray": "1348495886086307932",
        "beige": "1268625346413203528",
        "white": "1348495972006629386",
        "raspberry": "1371538399776866364",
        "teal": "1371538579721031822",
        "navy": "1446204509205434530",
        
    };


    if (!Object.keys(roles).includes(customId)) return;

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const role = interaction.guild.roles.cache.get(roles[customId]);
    if (!role) return;

    if (member.roles.cache.has(role.id)) {
        member.roles.remove(role);
        interaction.editReply(`Removed ${role.name} from you!`)
    } else {
        member.roles.add(role);
        interaction.editReply(`Added ${role.name} to you!`)
    }
};