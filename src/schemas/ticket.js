const mongoose = require("mongoose")

let TicketSchema = new mongoose.Schema({
    MemberID: String,
    ClaimedID: String,
    TicketID: String,
    ChannelID: String,
    AddedID: String,
    Closed: Boolean,
    Type: String
})

module.exports = mongoose.model("tickets", TicketSchema)