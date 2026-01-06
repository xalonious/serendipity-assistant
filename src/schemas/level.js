const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true 
    },
    xp: { 
        type: Number, 
        default: 0 
    },
    level: { 
        type: Number, 
        default: 0 
    },
    isTopUser: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('level', levelSchema);
