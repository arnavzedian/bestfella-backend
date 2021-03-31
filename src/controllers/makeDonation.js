const { Donation } = require("../database/db");

let makeDonation = async (req, res, next) => {
  //title, image, tags, city, GPS, donater, active

  let fields = ["title", "image", "tags", "city", "GPS"];

  for (let index of fields) {
    if (!req.body[index]) return next(index + " field is required");
  }

  if (!req.user) return next(" login is required");

  var newDonation = new Donation();
  newDonation.title = req.body.title;
  newDonation.image = req.body.image;
  newDonation.tags = req.body.tags;
  newDonation.city = req.body.city;
  newDonation.GPS = req.body.GPS;
  newDonation.donater = req.user.id;
  newDonation.active = true;

  try {
    await newDonation.save();
    sendSuccess();
  } catch (error) {
    next(error);
  }

  function sendSuccess() {
    return res.json({ data: true });
  }
};

module.exports = makeDonation;
