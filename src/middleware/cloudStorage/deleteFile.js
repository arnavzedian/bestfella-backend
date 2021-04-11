const storage = require("./config");
async function deleteFromCloudStorage(fileName) {
  let bucketName = "donation-images";

  try {
    await storage.bucket(bucketName).file(fileName).delete();
    console.log(`gs://${bucketName}/${fileName} deleted`);
  } catch (e) {
    throw e;
  }

  return true;
}

module.exports = deleteFromCloudStorage;
