const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.verifyGoogleToken = async (token) => {
  console.log("Verifying Google Token:", token); // Log the token
  console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID); // Log Google client ID

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  return ticket.getPayload();
};
