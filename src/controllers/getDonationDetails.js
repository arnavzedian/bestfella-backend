let { Donation } = require("../database/db");

async function getDonationDetails(req, res, next) {
  let donationID = req.body.donationID;

  if (!donationID) return next("donationID field required");

  let data = await Donation.findOne(
    { _id: req.body.donationID },
    { sort: { createdAt: -1 } }
  );
  return res.send({ data: data });
}

module.exports = getDonationDetails;
