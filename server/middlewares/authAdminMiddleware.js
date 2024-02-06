const jwt = require("jsonwebtoken");
const { JWT_ACCESS } = require("../config");

const ApiError = require("../exeptions/api-errors");

const authAdminMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    throw ApiError.UnauthorizedError();
  }

  try {
    const decoded = jwt.verify(token, JWT_ACCESS);

    if (!decoded.user.roles.includes("ADMIN")) {
      return res.status(403).json({ message: "Permission denied - Admin access required" });
    }

    req.user = decoded.user;
    next();
  } catch (error) {
    throw ApiError.UnauthorizedError();
  }
};

module.exports = authAdminMiddleware;
