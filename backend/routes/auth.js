// routes/authRoutes.js
const express = require("express");
const {
  googleAuth,
  register,
  login,
} = require("../controllers/authController");
const router = express.Router();

// Google OAuth authentication
router.post("/google", googleAuth);

// Email/password authentication
router.post("/register", register);
router.post("/login", login);

module.exports = router;
