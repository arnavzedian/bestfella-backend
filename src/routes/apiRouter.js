var express = require("express");
var router = express.Router();
const deactivateDonation = require("../controllers/deactivateDonation");
const getDonationDetails = require("../controllers/getDonationDetails");
const getFeeds = require("../controllers/getFeeds");
const getProfile = require("../controllers/getProfile");
const makeDonation = require("../controllers/makeDonation");
const requestPhoneNumber = require("../controllers/requestPhoneNumber");

router.get("/deactivate-donation", deactivateDonation);
router.get("/donation-details", getDonationDetails);
router.get("/feeds", getFeeds);
router.get("/profile", getProfile);
router.post("/donation", makeDonation);
router.get("/phone-number", requestPhoneNumber);

module.exports = router;
