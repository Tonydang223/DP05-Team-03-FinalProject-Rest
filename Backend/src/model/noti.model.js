const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noti = new Schema({
  channels: {
    type: Array,
    required: true,
    default: [],
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  isMappingByEmail: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('noti', noti);
