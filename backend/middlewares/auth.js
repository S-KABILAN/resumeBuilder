const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  console.log("Authenticating request to path:", req.path);

  // Check for Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("Authorization header missing");
    return res.status(401).json({
      success: false,
      error: "Unauthorized: No authorization header provided",
    });
  }

  // Extract token from header
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  if (!token) {
    console.log("Token missing in request");
    return res.status(401).json({
      success: false,
      error: "Unauthorized: No token provided",
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("JWT decoded successfully:", {
      id: decoded.id,
      email: decoded.email,
    });

    // Assign decoded user to request object
    req.user = decoded;

    // Ensure consistent id/userId property naming
    if (!req.user.id && req.user.userId) {
      req.user.id = req.user.userId;
    } else if (!req.user.userId && req.user.id) {
      req.user.userId = req.user.id;
    }

    // If neither id nor userId exists, reject the request
    if (!req.user.id && !req.user.userId) {
      console.error("Token payload missing both id and userId");
      return res.status(401).json({
        success: false,
        error: "Invalid token: Missing user identifier",
      });
    }

    console.log("User authenticated:", { id: req.user.id });
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);

    // Provide more specific error messages
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Token expired",
      });
    }

    return res.status(403).json({
      success: false,
      error: "Invalid token: " + err.message,
    });
  }
};

module.exports = authenticateToken;
