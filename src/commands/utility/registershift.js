const { ApplicationCommandOptionType, MessageFlags } = require("discord.js");
const roles = require("../../utils/roles");
const postToRoblox = require("../../utils/postToRoblox");

module.exports = {
    name: "registershift",
    description: "Register a shift",
    usage: "<duration>",
    rolesRequired: [roles.MR],
    options: [
        {
            name: "duration",
            description: "Duration of the shift in minutes",
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
    ],

    run: async (client, interaction) => {
        const shiftChannelId = "696034386994266223";
        const protectedMessageIds = [
            "1415429898566369280",
            "1415429943730638849"
        ];

        const genericMessages = [
            "Be sure to join our comms server!",
            "Head on down to the clinic for some fun!",
            "Make sure to check out our sessions and come have fun down at the clinic!",
            "Don't forget to invite your friends to join the fun!",
            "Stay tuned for upcoming events and activities!"
        ];

        const randomMessage = genericMessages[Math.floor(Math.random() * genericMessages.length)];

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        const duration = interaction.options.getNumber("duration");

        const shiftChannel = interaction.guild.channels.cache.get(shiftChannelId);

        await interaction.editReply(`✅ Your shift has been registered! The shift channel will automatically be cleared in ${duration} minutes.`);

        setTimeout(async () => {
            try {
                const fetchedMessages = await shiftChannel.messages.fetch({ limit: 100 });
                const deletableMessages = fetchedMessages.filter(m => !protectedMessageIds.includes(m.id));

                if (deletableMessages.size > 0) {
                    await shiftChannel.bulkDelete(deletableMessages);
                }

                await postToRoblox("general", "Welcome to SSC", randomMessage);

            } catch (error) {
                if(error.response?.status === 429) {
                    return;
                }
                console.error("Error clearing shift channel:", error);
            }
        }, duration * 60 * 1000);
    }
};
