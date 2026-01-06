const { ApplicationCommandOptionType, MessageFlags } = require("discord.js");
const roles = require("../../utils/roles");
const postToRoblox = require("../../utils/postToRoblox");

module.exports = {
    name: "registertraining",
    description: "Register a training",
    usage: "<duration>",
    rolesRequired: [roles.MR],
    options: [
        {
            name: "duration",
            description: "Duration of the training in minutes",
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
    ],

    run: async (client, interaction) => {
        const trainingChannelId = "696034347458887701";
        const protectedMessageIds = [
            "1415446546203541697",
            "1415446590490939475"
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

        const trainingChannel = interaction.guild.channels.cache.get(trainingChannelId);

        await interaction.editReply(`✅ Your training has been registered! The training channel will automatically be cleared in ${duration} minutes.`);

        setTimeout(async () => {
            try {
                const fetchedMessages = await trainingChannel.messages.fetch({ limit: 100 });
                const deletableMessages = fetchedMessages.filter(m => !protectedMessageIds.includes(m.id));

                if (deletableMessages.size > 0) {
                    await trainingChannel.bulkDelete(deletableMessages);
                }

                await postToRoblox("general", "Welcome to SSC", randomMessage);

            } catch (error) {
                if(error.response?.status === 429) {
                    return;
                }
                console.error("Error clearing training channel:", error);
            }
        }, duration * 60 * 1000);
    }
};
