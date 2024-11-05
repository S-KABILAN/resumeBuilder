const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Your Google Client ID

router.post("/google/login", async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify the token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const user = await User.findOne({ email: payload.email });

    if (!user) {
      const newUser = new User({
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      });
      await newUser.save();
    }

    // Respond with user information
    res
      .status(200)
      .json({ user: { name: payload.name, email: payload.email } });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid token" });
  }
});

module.exports = router;
