const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const history = new Schema({
  request: { type: mongoose.Types.ObjectId, ref: 'request' },
  created_request: { type: Object },
  updated_request: { type: Object },
  approved_request: { type: Object },
  reverted_request: { type: Object },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('history', history);
