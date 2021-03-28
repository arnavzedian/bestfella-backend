const generateCookie = require("../controllers/auth/generateCookie");
let express = require("express");
let router = express.Router();
router.get("/cookie", generateCookie);

module.exports = router;
