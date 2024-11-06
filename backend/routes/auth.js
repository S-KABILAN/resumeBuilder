// server/routes/auth.js
const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    // Check if user already exists
    let user = await User.findOne({ googleId: sub });
    if (!user) {
      // Create a new user
      user = new User({
        googleId: sub,
        email,
        name,
        picture,
      });
      await user.save();
    }

    res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Authentication failed" });
  }
});

module.exports = router;
