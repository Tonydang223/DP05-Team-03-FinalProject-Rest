const { ROLES } = require('../config/constants');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const user = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  img_profile: {
    type: String,
  },
  role: {
    type: String,
    default: 'Staff',
    enum: ROLES,
    required: true,
  },
  isMaster: {
    type: Boolean,
    default: false,
  },
  slackId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  editedAt: {
    type: Date,
    default: null,
  },
});

user.pre('save', async function (next) {
  try {
    const saltH = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, saltH);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('user', user);
