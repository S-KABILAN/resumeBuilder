const express = require("express");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const app = express();

dotenv.config();



app.use(
  cors({
    origin: "http://localhost:3000", // React frontend
    methods: ["GET", "POST"],
    credentials: true, // Allow cookies and authentication info
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Passport Google OAuth
require("./config/passport");

// Routes
app.use("/auth", require("./routes/authRoutes")); // Ensure your route is mounted properly
app.use("/resume", require("./routes/resumeRoutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
