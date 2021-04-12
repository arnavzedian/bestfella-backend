const { Donation } = require("../database/db");
const checkRequired = require("./checkRequired");
let makeDonation = async (req, res, next) => {
  //title, image, tags, city, GPS, donater, active

  let fields = [
    "title",
    "image",
    "tags",
    "city",
    "latitude",
    "longitude",
    "type",
  ];

  if (!req.body.type) req.body.type = "Rent";

  let otherFields = {};
  otherFields["donation"] = [];
  otherFields["rent"] = ["securityAmount", "price", "period"];
  otherFields["sell"] = ["price", "stock"];
  otherFields["sell used"] = ["price"];

  let check1 = checkRequired(fields, req.body, next);
  if (!check1) return;

  req.body.type = req.body.type.toLowerCase();
  let check2 = checkRequired(otherFields[req.body.type], req.body, next);
  if (!check2) return;

  if (!req.user) return next(" login is required");

  var newDonation = new Donation();
  newDonation.title = req.body.title;
  newDonation.image = req.body.image;
  newDonation.tags = req.body.tags;
  newDonation.city = req.body.city;
  newDonation.latitude = Number(req.body.latitude);
  newDonation.longitude = Number(req.body.longitude);
  newDonation.donater = req.user.id;
  newDonation.type = req.body.type;
  newDonation.stock = req.body.stock;
  newDonation.period = req.body.period;
  newDonation.price = req.body.price;
  newDonation.securityAmount = req.body.securityAmount;
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
