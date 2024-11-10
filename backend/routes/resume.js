// routes/resume.js
const express = require("express");
const {
  createOrUpdateResume,
  getResume,
  createOrUpdatePersonal,
  getPersonal,
  addOrUpdateEducation,
} = require("../controllers/resumeController");
const authenticateToken = require("../middlewares/auth");
const { createSkill, updateSkills } = require("../controllers/skillController");
const router = express.Router();

// Route to create or update resume
router.post("/", authenticateToken, createOrUpdateResume);
router.post("/personal", authenticateToken , createOrUpdatePersonal)
router.post("/education",authenticateToken,addOrUpdateEducation)
router.post("/skill",authenticateToken,createSkill)

router.post("/skillupdate",authenticateToken, updateSkills)

// Route to get resume
router.get("/", authenticateToken, getResume);
router.get("/personal", authenticateToken, getPersonal);

module.exports = router;
