const { isTokenValid } = require("../utils");

const authenticate = async (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    return res.status(401).json({ msg: "Authentication Invalid" });
  }
  try {
    const { userId, name } = await isTokenValid({
      token,
    });
    req.user = { userId, name };
    next();
  } catch (error) {
    return res.status(401).json({ msg: "You need to login" });
  }
};

module.exports = { authenticate };
