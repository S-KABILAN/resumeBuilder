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
const { createSkill, updateSkills, deleteSkill, getSkills } = require("../controllers/skillController");
const router = express.Router();

// Route to create or update resume
router.post("/", authenticateToken, createOrUpdateResume);
router.post("/personal", authenticateToken , createOrUpdatePersonal)
router.post("/education",authenticateToken,addOrUpdateEducation)
router.post("/skill",authenticateToken,createSkill)

router.put("/skillupdate/:skillId", authenticateToken, updateSkills);

// Route to get resume
router.get("/", authenticateToken, getResume);
router.get("/personal", authenticateToken, getPersonal);
router.get("/get-skills",authenticateToken, getSkills);

//Route to delete
router.delete("/deleteskills/:skillId", authenticateToken,deleteSkill);

module.exports = router;

