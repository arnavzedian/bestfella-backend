const multer = require("multer");
const uploadImage = require("./uploadImage");

function setupCloudStorage(app) {
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
  });

  app.disable("x-powered-by");
  // app.use(upload.array("files", 10));

  app.post("/api/v1/uploads", upload.single("file"), async (req, res, next) => {
    try {
      const myFile = req.file;
      //consoe
      const imageUrl = await uploadImage(myFile);
      res.status(200).json({
        message: "Upload was successful",
        data: { url: imageUrl },
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = setupCloudStorage;
