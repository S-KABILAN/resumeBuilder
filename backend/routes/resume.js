// server/routes/resume.js
const express = require("express");
const Resume = require("../models/Resume");
const authenticateToken = require("../middlewares/auth");
const router = express.Router();

// Create or update resume
router.post("/", authenticateToken, async (req, res) => {
  try {
    const {
      title,
      fullName,
      email,
      phone,
      summary,
      education,
      experience,
      skills,
      projects,
    } = req.body;

    // Create a new resume linked to the authenticated user
    const resume = new Resume({
      userId: req.user.id, // Attach user ID from token
      title,
      fullName,
      email,
      phone,
      summary,
      education,
      experience,
      skills,
      projects,
    });

    await resume.save();

    res.status(201).json({ success: true, data: resume });
  } catch (err) {
    console.error("Error saving resume:", err); // Log the error
    res
      .status(500)
      .json({ success: false, message: "Resume operation failed" });
  }
});

// Get resume
router.get("/", authenticateToken, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id }).populate(
      "user",
      "name email picture"
    );
    if (!resume)
      return res
        .status(404)
        .json({ success: false, message: "Resume not found" });

    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching resume" });
  }
});

module.exports = router;
