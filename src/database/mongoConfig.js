const mongoose = require("mongoose");
if (!process.env.PORT) require("dotenv").config();
mongoose.set("runValidators", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

global.mainDBconnectionEstablished = false;
//connect-vs-createconnection
//My understanding on the official documentation is that generally when there is only one connection mongoose.connect() is use, whereas if there is multiple instance of connection mongoose.createConnection() is used.

let mainMongooseInstance = mongoose.createConnection(
  process.env.MAIN_DATABASE_LINK,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mainMongooseInstance.on("error", function (error) {
  console.log("error setting up main database", error);
});

mainMongooseInstance.once("open", function () {
  global.mainDBconnectionEstablished = true;
  console.log("Main Database connection established");
});

//    poolSize: 10 // Can now run 10 operations at a time

//tutorial to setup gfs,https://niralar.com/mongodb-gridfs-using-mongoose-on-nodejs/
// gfs will be used for reading files

module.exports = {
  mainMongooseInstance: mainMongooseInstance,
  mongoose: mongoose,
};
