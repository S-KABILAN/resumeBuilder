// server/config/googleAuth.js
const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Function to verify the Google ID token
async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    return payload; // Contains user information from Google
  } catch (error) {
    console.error("Error verifying token", error);
    throw new Error("Google authentication failed");
  }
}

module.exports = verifyGoogleToken;
