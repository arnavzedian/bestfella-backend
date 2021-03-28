const mongoose = require("mongoose");

let unlock = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  donationID: String.apply,
  createdAt: { type: Date, required: true, default: Date.now },
});

unlock.index({ createdAt: 1 });

module.exports = unlock;
