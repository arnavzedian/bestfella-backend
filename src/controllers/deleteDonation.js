let { Donation } = require("../database/db");
let deleteFromCloudStorage = require("../middleware/cloudStorage/deleteFile");
async function requestPhoneNumber(req, res, next) {
  let fields = ["donationID"];
  let requester = req.user.id;

  if (!requester) return next("login in required");

  for (let index of fields) {
    if (!req.body[index]) return next(index + " field is required");
  }

  let existingEntry = await Donation.findOne({
    _id: req.body.donationID,
    donater: requester,
  });
  console.log(req.body.donationID, requester);
  if (!existingEntry) return next("permission denied");

  //image to delete
  let image = existingEntry.image;

  let imageArray = image.split("/");
  let imageName = imageArray[imageArray.length - 1];
  console.log(imageName);
  try {
    await Donation.deleteOne({ _id: req.body.donationID });
    await deleteFromCloudStorage(imageName);
  } catch (e) {
    return next(e);
  }

  return res.json({ data: true });
}

module.exports = requestPhoneNumber;
