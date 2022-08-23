const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: [true, 'Please provide a user name.'] },
    email: { type: String, required: [true, 'Please provide an email.'], unique: true },
    password: { type: String, required: [true, 'Please provide a password'] },
    role: { type: String, default: 'regularUser' },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
