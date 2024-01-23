const jwt = require("jsonwebtoken");
const { secret } = require("../config");

// Middleware for JWT authentication
module.exports = function (req, res, next) {
  // Allow OPTIONS requests without authentication
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Check if the token is missing
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // Verify the token and decode the user information
    const decodedData = jwt.verify(token, secret);

    // Attach the user information to the request object
    req.user = decodedData.user;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};
