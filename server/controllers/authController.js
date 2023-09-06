const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const { createTokenUser, attachCookiesToResponse } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res
      .status(400)
      .json({ msg: "Please provide email, password, and name to register" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 6 characters long" });
  }

  const isEmailValid = validator.isEmail(email);
  if (!isEmailValid) {
    return res.status(400).json({ msg: "Please provide a valid email" });
  }

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    return res.status(400).json({ msg: "Email already exists" });
  }

  try {
    const user = await User.create({ email, name, password });
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(201).json({ user: tokenUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

const login = async (req, res) => {};

const logout = async (req, res) => {};

module.exports = {
  register,
  login,
  logout,
};
