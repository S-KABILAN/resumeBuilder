
// server/controllers/authController.js
const verifyGoogleToken = require('../config/googleAuth');

// Handle Google login and return user data
async function googleLogin(req, res) {
  const { token } = req.body; // Token sent from frontend

  try {
    const user = await verifyGoogleToken(token);
    // Here you can store user info in your database or create a session

    // For simplicity, we are just returning the user information
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
}

module.exports = { googleLogin };
