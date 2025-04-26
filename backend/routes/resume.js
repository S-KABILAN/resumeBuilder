// routes/resume.js
const express = require("express");
const authenticateToken = require("../middlewares/auth");
const {
  createSkill,
  updateSkills,
  deleteSkill,
  getSkills,
} = require("../controllers/skillController");
const {
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
} = require("../controllers/ExperienceController");
const {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const {
  createCertification,
  updateCertification,
  getAllCertifications,
  deleteCertification,
} = require("../controllers/certificateController");
const {
  createPersonal,
  updatePersonal,
  getAllPersonal,
  deletePersonal,
} = require("../controllers/personalInfoController");
const { createEducation } = require("../controllers/educationController");
const {
  createResume,
  getAllResumes,
  updateResume,
  deleteResume,
  getResumeById,
} = require("../controllers/resumeController");
const router = express.Router();

// Resume CRUD operations
router.post("/r", authenticateToken, createResume);
router.get("/r", authenticateToken, getAllResumes);
router.get("/r/:id", authenticateToken, getResumeById);
router.put("/r/:id", authenticateToken, updateResume);
router.delete("/r/:id", authenticateToken, deleteResume);

// Individual section operations
router.post("/personal", authenticateToken, createPersonal);
router.post("/education", authenticateToken, createEducation);
router.post("/skill", authenticateToken, createSkill);
router.post("/experience", authenticateToken, createExperience);
router.post("/project", authenticateToken, createProject);
router.post("/certificate", authenticateToken, createCertification);

router.put("/personal", authenticateToken, updatePersonal);
router.put("/skillupdate/:skillId", authenticateToken, updateSkills);
router.put("/experience/:experienceId", authenticateToken, updateExperience);
router.put("/project/:projectId", authenticateToken, updateProject);
router.put(
  "/certificate/:certificationId",
  authenticateToken,
  updateCertification
);

router.get("/personal", authenticateToken, getAllPersonal);
router.get("/get-skills", authenticateToken, getSkills);
router.get("/experience", authenticateToken, getExperiences);
router.get("/project", authenticateToken, getAllProjects);
router.get("/certificate", authenticateToken, getAllCertifications);

router.delete("/personal", authenticateToken, deletePersonal);
router.delete("/deleteskills/:skillId", authenticateToken, deleteSkill);
router.delete("/experience/:experienceId", authenticateToken, deleteExperience);
router.delete("/project/:projectId", authenticateToken, deleteProject);
router.delete(
  "/certificate/:certificationId",
  authenticateToken,
  deleteCertification
);

module.exports = router;
