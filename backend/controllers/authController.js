// controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { verifyGoogleToken } = require("../utils/googleAuth");

exports.googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify Google token and extract user data
    const { sub, email, name, picture } = await verifyGoogleToken(token);

    // Check if user exists; if not, create a new user
    let user = await User.findOne({ googleId: sub });
    if (!user) {
      user = new User({
        googleId: sub,
        email,
        name,
        picture,
      });
      await user.save();
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ success: true, token: jwtToken, data: { user } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Authentication failed" });
  }
};
