let { User } = require("../database/db");

async function getFeeds(req, res, next) {
  if (!req.user) return next("You are not logged in");
  let user = await User.findOne({ _id: req.user.id });
  if (!user) return next("you have been banned");
  return res.send({ data: user["phoneNumber"] });
}

module.exports = getFeeds;
