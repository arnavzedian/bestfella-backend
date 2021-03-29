let express = require("express");
let router = express.Router();
const apiRouter = require("./apiRouter");
const authRouter = require("./authRouter");
router.use("/api/v1/auth", authRouter);
router.use("/api/v1", apiRouter);

router.use((req, res, next) => {
  next("this is bestfella, and I am sorry to say route not found");
});

module.exports = router;
