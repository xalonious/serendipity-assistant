const mongoose = require('mongoose');

const warningSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    warnings: [{
        _id: false,
        warnid: { type: String, required: true },
        moderatorid: { type: String, required: true },
        reason: { type: String, required: true },
        date: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('Warnings', warningSchema);
