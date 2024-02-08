const jwt = require("jsonwebtoken");
const { JWT_ACCESS } = require("../config");
const ApiError = require("../exeptions/api-errors");

// Middleware for JWT authentication
module.exports = function (req, res, next) {
  // Allow OPTIONS requests without authentication
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Check if the token is missing or not
    if (!token) {
      throw ApiError.UnauthorizedError();
    }

    // Verify the token and decode the user information
    const decodedData = jwt.verify(token, JWT_ACCESS);

    // Attach the user information to the request object
    req.user = decodedData.user;

    // Move to the next middleware or route handler.
    next();
  } catch (error) {
    throw ApiError.UnauthorizedError();
  }
};
