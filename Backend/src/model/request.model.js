const mongoose = require('mongoose');
const { STATUS_REQUEST } = require('../config/constants');
const Schema = mongoose.Schema;

const request = new Schema({
  from: { type: Date, require: true },
  to: { type: Date, require: true },
  time: { type: String, require: true },
  reason: { type: String, require: true },
  quantity: { type: Number, require: true },
  status: { type: String, require: true, enum: STATUS_REQUEST, default: 'Pending' },
  type_of_work: { type: String, require: true},
  user: { type: mongoose.Types.ObjectId, ref: 'user' },
  create_at: {
    type: Date,
    default: new Date(),
  },
  edit_at: { type: Date, default: null },
});

module.exports = mongoose.model('request', request);
