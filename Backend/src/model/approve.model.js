const mongoose = require('mongoose');
const { STATUS_REQUEST } = require('../config/constants');
const Schema = mongoose.Schema;

const approve = new Schema({
  type_approve: {
    type: String,
    enum: STATUS_REQUEST,
  },
  request: { type: mongoose.Types.ObjectId, ref: 'request' },
  created_at: {
    type: Date,
    default: new Date(),
  },
  user: { type: mongoose.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('approve', approve);
