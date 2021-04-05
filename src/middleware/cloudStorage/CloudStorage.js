const multer = require("multer");
const uploadImage = require("./uploadImage");

function setupCloudStorage(app) {
  const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
  });

  app.disable("x-powered-by");
  app.use(multerMid.single("file"));

  app.post("/uploads", async (req, res, next) => {
    try {
      const myFile = req.file;
      const imageUrl = await uploadImage(myFile);
      res.status(200).json({
        message: "Upload was successful",
        data: imageUrl,
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = setupCloudStorage;
