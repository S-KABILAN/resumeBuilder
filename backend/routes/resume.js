// server/routes/resume.js
const express = require("express");
const Resume = require("../models/Resume");
const authenticateToken = require("../middlewares/auth");
const router = express.Router();

// Create or update resume
router.post("/", authenticateToken, async (req, res) => {
  const {
    objective,
    education,
    experience,
    skills,
    projects,
    certifications,
    contactInfo,
  } = req.body;

  try {
    let resume = await Resume.findOne({ user: req.user.id });

    if (resume) {
      // Update existing resume
      resume = Object.assign(resume, {
        objective,
        education,
        experience,
        skills,
        projects,
        certifications,
        contactInfo,
      });
      await resume.save();
    } else {
      // Create new resume
      resume = new Resume({
        user: req.user.id,
        objective,
        education,
        experience,
        skills,
        projects,
        certifications,
        contactInfo,
      });
      await resume.save();
    }

    res.status(200).json({ success: true, data: resume });
  } catch (error) {
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
