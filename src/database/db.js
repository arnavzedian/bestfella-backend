let { mainMongooseInstance } = require("./mongoConfig.js");
const user = require("./models/user");
const donation = require("./models/donation");
const unlock = require("./models/unlock");

module.exports = {
  User: mainMongooseInstance.model("user", user),
  Donation: mainMongooseInstance.model("donation", donation),
  Unlock: mainMongooseInstance.model("unlock", unlock),
  mainMongooseInstance: mainMongooseInstance,
};
