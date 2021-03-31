const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: String,
  googleId: String,
  phoneNumber: Number,
  name: String,
});

user.index({ name: "text", about: "text", tags: "text", username: "text" });

user.methods.generateToken = function () {
  let JWT_payload = {
    picture: this.picture,
    id: this.id,
    username: this.username,
    name: this.name,
    email: this.email,
  };

  console.log(JWT_payload);

  return jwt.sign(JWT_payload, secret, {
    //default algorithm is HS256
    expiresIn: "360 days",
  });
};

module.exports = user;
