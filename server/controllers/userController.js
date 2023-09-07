const User = require("../models/User");

const updatePassword = async (req, res) => {
  const userId = req.user.userId;

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
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

module.exports = {
  updatePassword,
};
