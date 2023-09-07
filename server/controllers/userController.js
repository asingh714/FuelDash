const User = require("../models/User");
const validator = require("validator");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

const updatePassword = async (req, res) => {
  const userId = req.user.userId;

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return res
      .status(400)
      .json({ msg: "Please provide current password and new password" });
  }

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  const isPasswordValid = await user.comparePassword(currentPassword);

  if (!isPasswordValid) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  try {
    user.password = newPassword;

    await user.save();

    res.status(200).json({ msg: "Password updated" });
  } catch {
    return res.status(500).json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.user.userId;

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ msg: "Please provide name" });
  }

  const isEmailValid = validator.isEmail(email);
  if (!isEmailValid) {
    return res.status(400).json({ msg: "Please provide a valid email" });
  }

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { name, email },
      { new: true, runValidators: true }
    );

    res.status(200).json({ updatedUser });
  } catch {
    return res.status(500).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findOne({ _id: userId });
    await user.remove();
    res.status(200).json({ msg: "User deleted" });
  } catch {
    return res.status(500).json({ msg: error.message });
  }
};

const becomePaidUser = async (req, res) => {
  const { userId, name, subscriptionStatus } = req.user;

  try {
    const paidUser = await User.findOneAndUpdate(
      { _id: userId },
      { subscriptionStatus: "Paid" },
      { new: true, runValidators: true }
    );

    const tokenUser = createTokenUser({
      _id: userId,
      name,
      subscriptionStatus: "Paid",
    });
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(200).json({ user: paidUser });
  } catch {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  updatePassword,
  updateUser,
  deleteUser,
  becomePaidUser,
};
