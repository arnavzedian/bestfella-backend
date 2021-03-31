let { Donation } = require("../database/db");

async function getFeeds(req, res, next) {
  let basis = req.body.basis;
  let value = req.body.value;
  if (!basis) return next("basis field required");
  if (basis != "city" && basis != "donater") return next("invalid basis field");

  let data = await Donation.find({ [basis]: value }, ["image", "title"], {
    sort: { createdAt: -1 },
  });
  return res.send({ data: data });
}

module.exports = getFeeds;
