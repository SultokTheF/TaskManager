const jwt = require("jsonwebtoken");
const { secret } = require("../config");

const authAdminMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (!decoded.user.roles.includes("ADMIN")) {
      return res.status(403).json({ message: "Permission denied - Admin access required" });
    }

    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = authAdminMiddleware;
