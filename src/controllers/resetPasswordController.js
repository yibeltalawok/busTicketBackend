const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
      // Verify the email is registered
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'Email not found' });
      }
      // Generate a reset token
      // const resetToken = bcrypt.randomBytes(20).toString('hex');
      const rnu =654376;
      const resetToken=rnu.toString()
      console.log("resetToken==",resetToken)

      user.resetToken = resetToken;
      user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
      await user.save();
  
      // Send email with reset instructions
      await sendResetEmail(email, resetToken);
      res.json({ message: 'Password reset instructions sent to your email' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // 2. Create a "Reset Password" route
  exports.passwordReset=async (req, res) => {
    const { password, resetToken } = req.body;
    try {
      // Find the user by the reset token
      const user = await User.findOne({
        resetToken,
        resetTokenExpiration: { $gt: Date.now() },
      });
      if (!user) {
        return res.status(404).json({ error: 'Invalid or expired reset token' });
      }
      // Update the password and invalidate the reset token
      user.password = password;
      user.resetToken = null;
      user.resetTokenExpiration = null;
      await user.save();
      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  