const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const validator = require("validator");

const User = require("../models/User");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

const getUserProfile = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

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
  const { userId } = req.params;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await User.deleteOne({ _id: userId });

    res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getUserProfile,
  updatePassword,
  updateUser,
  deleteUser,
};
