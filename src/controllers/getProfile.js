let { Donation } = require("../database/db");

async function getFeeds(req, res, next) {
  if (!req.user) return next("You are not logged in");
  return res.send({ data: req.user });
}

module.exports = getFeeds;
