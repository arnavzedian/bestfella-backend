const { Donation } = require("../database/db");

let makeDonation = async (req, res, next) => {
  //title, image, tags, city, GPS, donater, active

  let fields = ["title", "image", "tags", "city", "latitude", "longitude"];

  for (let index of fields) {
    if (!req.body[index]) return next(index + " field is required");
  }

  if (!req.user) return next(" login is required");

  var newDonation = new Donation();
  newDonation.title = req.body.title;
  newDonation.image = req.body.image;
  newDonation.tags = req.body.tags;
  newDonation.city = req.body.city;
  newDonation.latitude = Number(req.body.latitude);
  newDonation.longitude = Number(req.body.longitude);
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
