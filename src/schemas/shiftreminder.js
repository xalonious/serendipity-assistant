const mongoose = require("mongoose")

let shiftreminderSchema = new mongoose.Schema({
    robloxusername: String,
    discordid: String
})

module.exports = mongoose.model("shiftreminders", shiftreminderSchema)