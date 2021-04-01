let { User } = require("../database/db");

async function savePhoneNumber(req, res, next) {
  if (!req.user) return next("You are not logged in");

  let user = await User.findOneAndUpdate(
    { _id: req.user.id },
    { phoneNumber: req.body.phoneNumber }
  );

  return res.send({ data: true });
}

module.exports = savePhoneNumber;
