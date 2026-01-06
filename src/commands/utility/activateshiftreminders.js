const shiftreminderSchema = require("../../schemas/shiftreminder")
const roles = require("../../utils/roles")
const noblox = require("noblox.js")
const { getRobloxIdFromDiscordId } = require("../../utils/bloxlinkUtils")

module.exports = {
    name: "activateshiftreminders",
    description: "Activates shift reminders for you",
    rolesRequired: [roles.MR],

    run: async(client, interaction) => {
        await interaction.deferReply();

        const existingReminder = await shiftreminderSchema.findOne({ discordid: interaction.user.id });

        if(existingReminder) return interaction.editReply("You already have shift reminders activated.");

        const robloxId = await getRobloxIdFromDiscordId(interaction.user.id);
        const robloxUser = await noblox.getUsernameFromId(robloxId);

        await shiftreminderSchema.create({
            discordid: interaction.user.id,
            robloxusername: robloxUser
        });

        interaction.editReply("Shift reminders have been activated.");
    }

}