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

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ msg: "Please provide email and password to login" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  try {
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(200).json({ user: tokenUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });

  res.status(200).json({ msg: "User logged out" });
};

module.exports = {
  register,
  login,
  logout,
};
