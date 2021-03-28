const db = require("./db.js");
const mongoose = require("mongoose");
const { mainMongooseInstance } = require("./mongoConfig.js");
let mainDatabase = {
  link: process.env.MAIN_DATABASE_LINK,
  collection: db,
  instance: mainMongooseInstance,
};

mainMongooseInstance.once("open", () => {
  mainDatabase.gfs = {
    profilePicture: new mongoose.mongo.GridFSBucket(mainMongooseInstance.db, {
      bucketName: "profilePicture",
    }),
    hostingUpload: new mongoose.mongo.GridFSBucket(mainMongooseInstance.db, {
      bucketName: "hostingUpload",
    }),
  };
});

module.exports = mainDatabase;
