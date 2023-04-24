const { STATUS_WORKSPACE } = require('../config/constants');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workspace = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    default: 'open',
    enum: STATUS_WORKSPACE,
  },
  isMappingByEmail: {
    type: Boolean,
    default: false,
  },
  user: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
  create_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('workspace', workspace);
