let { Donation } = require("../database/db");

async function getFeeds(req, res, next) {
  let basis = req.query.basis;
  let value = req.query.value;

  if (!basis) return next("basis field required");
  if (!value && basis == "donater") value = req.user.id;
  if (basis != "city" && basis != "donater") return next("invalid basis field");

  let data = await Donation.find(
    { [basis]: value },
    ["image", "title", "tags", "latitude", "longitude", "donater"],
    {
      sort: { createdAt: -1 },
    }
  );
  return res.send({ data: data });
}

module.exports = getFeeds;
