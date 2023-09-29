const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  const sevenDays = 1000 * 60 * 60 * 24 * 7;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + sevenDays),
    secure: process.env.NODE_ENV,
    signed: true,
  });
};

const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { createJWT, isTokenValid, attachCookiesToResponse };
