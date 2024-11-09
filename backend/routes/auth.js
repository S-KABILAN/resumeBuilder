// routes/authRoutes.js
const express = require("express");
const { googleAuth } = require("../controllers/authController");
const router = express.Router();

router.post("/google", googleAuth);

module.exports = router;
