const mongoose = require('mongoose');
const { Schema } = mongoose;

const specialTagSchema = new Schema({
  robloxid: {
    type: String,
    required: true,
    trim: true,
  },
  discordid: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String],
    enum: [
      'BOOSTER',
      'EOTM',
      'CONTENT_CREATOR',
    ],
    default: [],
    index: true, 
  },
});

module.exports = mongoose.model('specialtag', specialTagSchema);
