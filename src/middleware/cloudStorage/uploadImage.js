const util = require("util");
const gc = require("./config");
const bucket = gc.bucket("donation-images");

function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const { buffer } = file;

    let name = Date.now() + Math.round(Math.random() * 100);
    if (file.originalname) {
      name = file.originalname.replace(/ /g, "_");
    }

    const blob = bucket.file(name);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream
      .on("finish", () => {
        const publicUrl = util.format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      })
      .on("error", (data) => {
        console.log(data);
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });
}

module.exports = uploadImage;
