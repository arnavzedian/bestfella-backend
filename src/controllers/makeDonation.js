const { Donation } = require("../database/db");
const checkRequired = require("./checkRequired");
const clearUnwantedFields = require("./clearUnwantedFields");
let makeDonation = async (req, res, next) => {
  //title, image, tags, city, GPS, donater, active
  console.log("making donation", req.body.type);
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
  let unwantedFields = {};
  otherFields["donate"] = [];
  otherFields["rent"] = ["security", "price", "period"];
  otherFields["sell"] = ["price"];
  otherFields["used"] = ["price"];

  unwantedFields["donate"] = ["security", "price", "period"];
  unwantedFields["rent"] = [];
  unwantedFields["sell"] = ["security", "period"];
  unwantedFields["used"] = unwantedFields["sell"];

  let check1 = checkRequired(fields, req.body, next);
  if (!check1) return;

  req.body.type = req.body.type.toLowerCase();
  if (!otherFields[req.body.type]) return next("invalid type " + req.body.type);

  clearUnwantedFields(unwantedFields[req.body.type], req.body);

  let check2 = checkRequired(otherFields[req.body.type], req.body, next);
  if (!check2) return;

  if (!req.user) return next("login is required");

  if (req.body.isUsed) req.body.type = "used";

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
  newDonation.security = req.body.security;
  newDonation.active = true;

  try {
    await newDonation.save();
    sendSuccess();
  } catch (error) {
    next(error);
  }

  function sendSuccess() {
    console.log("Made donation");
    return res.json({ data: true });
  }
};

module.exports = makeDonation;
