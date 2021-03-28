let express = require("express");
let router = express.Router();
const apiRouter = require("./apiRouter");
const authRouter = require("./authRouter");
router.use("/api/v1/auth", subdomain("auth", authRouter));
router.use("/api/v1", apiRouter);

router.use((req, res, next) => {
  next("route not found");
});

module.exports = router;
