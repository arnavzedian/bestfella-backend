const mongoose = require("mongoose");

let unlock = new mongoose.Schema({
  requester: {
    type: String,
    required: true,
  },
  donationID: String,
  dateOfEntry: String,
});

unlock.index({ dateOfEntry: 1 });

module.exports = unlock;
