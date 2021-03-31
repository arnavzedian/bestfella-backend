let { Donation } = require("../database/db");

async function deactivateDonation(req, res, next) {
  let donationID = req.body.donationID;

  if (!donationID) return next("donationID is required");
  if (!req.user) return next("login is required");

  let donation = await Donation.findOne({ id: donationID });
  if (donation.id != req.user.id) return next("permission denied");

  try {
    donation.active = false;
    await donation.save();
    res.json({
      data: true,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = deactivateDonation;
