const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  console.log("Authorization Header (Middleware):", req.headers.authorization); // Log the Authorization header
  console.log("JWT Secret:", process.env.JWT_SECRET); // Log the JWT secret (remove this in production)

  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    console.log("Token missing in request");
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Token verification error:", err.message); // Log specific error
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
