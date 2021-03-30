let { Donation } = require("../../database/db");

async function getFeeds(req, res, next) {
  let basis = req.body.basis;

  if (!basis) return next("basis field required");
  if (basis != "city" && basis != "donater") return next("invalid basis field");

  let data = await Donation.find({ searchConfig }, { sort: { createdAt: -1 } });
  return res.send({ data: data });
}

module.exports = getFeeds;
