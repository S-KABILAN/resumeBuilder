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
const { createExperience, getExperiences, updateExperience, deleteExperience } = require("../controllers/ExperienceController");
const { getAllProjects, createProject, updateProject, deleteProject } = require("../controllers/projectController");
const { createCertification, updateCertification, getAllCertifications, deleteCertification } = require("../controllers/certificateController");
const router = express.Router();

// Route to create or update resume
router.post("/", authenticateToken, createOrUpdateResume);
router.post("/personal", authenticateToken , createOrUpdatePersonal)
router.post("/education",authenticateToken,addOrUpdateEducation)
router.post("/skill",authenticateToken,createSkill)
router.post("/experience",authenticateToken,createExperience)
router.post("/project",authenticateToken,createProject)
router.post("/certificate", authenticateToken, createCertification)

router.put("/skillupdate/:skillId", authenticateToken, updateSkills);
router.put("/experience/:experienceId", authenticateToken, updateExperience);
router.put("/project/:projectId",authenticateToken, updateProject);
router.put("/certificate/:certificationId",authenticateToken, updateCertification);

// Route to get resume
router.get("/", authenticateToken, getResume);
router.get("/personal", authenticateToken, getPersonal);
router.get("/get-skills",authenticateToken, getSkills);
router.get("/experience", authenticateToken,getExperiences);
router.get("/project",authenticateToken, getAllProjects)
router.get("/certificate", authenticateToken, getAllCertifications);

//Route to delete
router.delete("/deleteskills/:skillId", authenticateToken,deleteSkill);
router.delete("/experience/:experienceId", authenticateToken, deleteExperience);
router.delete("/project/:projectId", authenticateToken, deleteProject);
router.delete("/certificate/:certificationId", authenticateToken, deleteCertification);

module.exports = router;

