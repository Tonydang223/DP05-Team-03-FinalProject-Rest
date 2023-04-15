const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const group = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  workspace: { type: mongoose.Types.ObjectId, ref: 'workspace' },
  added_users: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
});

module.exports = mongoose.model('group', group);
