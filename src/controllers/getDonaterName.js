let { Unlock, User, Donation } = require("../database/db");
const checkRequired = require("./checkRequired");

async function getDonaterName(req, res, next) {
  let fields = ["donationID"];
  let requester = req.user.id;

  let check1 = checkRequired(fields, req.query, next);
  if (!check1) return;

  sendData();

  async function sendData() {
    let donation = await Donation.findOne({
      _id: req.query.donationID,
    });

    if (!donation) return next("donation has been deleted");

    let user = await User.findOne({
      _id: donation.donater,
    });

    if (!user) return next("user not found");

    res.json({
      data: user.name,
    });
  }
}

module.exports = getDonaterName;
