// controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { verifyGoogleToken } = require("../utils/googleAuth");

// Google authentication
exports.googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify Google token and extract user data
    const { sub, email, name, picture } = await verifyGoogleToken(token);

    // Check if user exists; if not, create a new user
    let user = await User.findOne({ googleId: sub });
    if (!user) {
      // Check if email already exists
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        // Link Google account to existing email account
        existingEmail.googleId = sub;
        existingEmail.picture = picture || existingEmail.picture;
        await existingEmail.save();
        user = existingEmail;
      } else {
        // Create new user
        user = new User({
          googleId: sub,
          email,
          name,
          picture,
          isPasswordUser: false,
        });
        await user.save();
      }
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      token: jwtToken,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          picture: user.picture,
        },
      },
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ success: false, message: "Authentication failed" });
  }
};

// Register new user with email/password
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    // Create new user
    const user = new User({
      email,
      name,
      password,
      isPasswordUser: true,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

// Login with email/password
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user has a password (could be Google-only user)
    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: "Please log in with Google",
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          picture: user.picture,
        },
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
};
