// routes/resume.js
const express = require("express");
const {
  createOrUpdateResume,
  getResume,
  createOrUpdatePersonal,
  getPersonal,
} = require("../controllers/resumeController");
const authenticateToken = require("../middlewares/auth");
const router = express.Router();

// Route to create or update resume
router.post("/", authenticateToken, createOrUpdateResume);
router.post("/personal", authenticateToken , createOrUpdatePersonal)


// Route to get resume
router.get("/", authenticateToken, getResume);
router.get("/personal", authenticateToken, getPersonal);

module.exports = router;
