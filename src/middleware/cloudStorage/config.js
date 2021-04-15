const Cloud = require("@google-cloud/storage");
const path = require("path");
const serviceKey = path.join(__dirname, "./keys.json");

const { Storage } = Cloud;
console.log(process.env.project_id);
const storage = new Storage({
  projectId: process.env.project_id,
  credentials: {
    private_key: process.env.private_key.replace(
      new RegExp("\\\\n", "g"),
      "\n"
    ),
    client_email: process.env.client_email,
  },
});

// keyFilename: serviceKey,
// projectId: "your project id",

module.exports = storage;
