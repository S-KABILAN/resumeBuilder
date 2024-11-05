const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get user resume data
router.get("/", async (req, res) => {
  if (!req.user) {
    return res.status(401).send("Not authorized");
  }

  const user = await User.findById(req.user.id);
  res.json(user.resumeData);
});

// Update resume data
router.post("/", async (req, res) => {
  if (!req.user) {
    return res.status(401).send("Not authorized");
  }

  const { personalDetails, experience, education, skills } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      resumeData: { personalDetails, experience, education, skills },
    },
    { new: true }
  );

  res.json(user.resumeData);
});

module.exports = router;
