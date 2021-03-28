let { User } = require("../../../database/db");

async function generateCookie(req, res, next) {
  let accessToken = req.query.accessToken;
  let userInfo = await getUserInfo(accessToken);
  let JWT_token = await saveUser(userInfo);
  res.json({ data: { token: JWT_token } });
}

async function getUserInfo(accessToken) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const json = await response.json();
  return json;
}

async function saveUser(payload) {
  let user = await User.findOne({ email: payload.email });
  if (user) {
    return user.generateToken();
  } else {
    let count = await User.countDocuments({ name: payload.name });
    let username = payload.name.replace(" ", "-") + count;
    var user_save = new User({
      name: payload.name,
      username: username,
      password: null,
      email: payload.email,
      googleId: payload.id,
      verified: true,
      verificationCode: null,
    });

    await user_save.save();
    return user.generateToken();
  }
}

module.exports = generateCookie;
