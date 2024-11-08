// server/app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const resumeRoutes = require("./routes/resume")
require("dotenv").config();

const app = express();

// CORS configuration to allow your frontend origin
const corsOptions = {
  origin: process.env.REACT_APP_URL, // Replace with your frontend URL
  credentials: true, // Allow credentials if needed
};
app.use(cors(corsOptions));

// Middleware to handle JSON payloads
app.use(express.json());

// Set Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy headers
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// Route setup
app.use("/api/auth", authRoutes);
app.use("/api/resume",resumeRoutes)

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Server port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
