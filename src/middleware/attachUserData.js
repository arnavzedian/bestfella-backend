let JWT_SECRET = process.env.JWT_SECRET;
const { User } = require("../database/db");
var jwt = require("jsonwebtoken");

async function attachUserData(req, res, next) {
  if (!req.headers.authorization) return next();
  let cookie = req.headers.authorization.replace("Bearer", "").trim();
  let userData;
  try {
    userData = cookie ? parseJWT(cookie) : null;
    let user = await User.findOne({ _id: userData.id });
    if (!user) return next("Invalid Token");
  } catch (e) {
    next(e);
  }

  req.user = userData;

  next();
}

function parseJWT(value) {
  var payload;
  try {
    payload = jwt.verify(value, JWT_SECRET);
  } catch (e) {
    return reject(e);
  }

  return payload;
}

module.exports = attachUserData;
