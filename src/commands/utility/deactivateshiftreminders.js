const shiftreminderSchema = require("../../schemas/shiftreminder")
const roles = require("../../utils/roles")

module.exports = {
    name: "deactivateshiftreminders",
    description: "Deactivates shift reminders for you",
    rolesRequired: [roles.MR],

    run: async(client, interaction) => {
        await interaction.deferReply();

        const existingReminder = await shiftreminderSchema.findOne({ discordid: interaction.user.id });

        if(!existingReminder) return interaction.editReply("You don't have shift reminders activated.");

        await shiftreminderSchema.deleteOne({ discordid: interaction.user.id });

        interaction.editReply("Shift reminders have been deactivated.");
    }

}