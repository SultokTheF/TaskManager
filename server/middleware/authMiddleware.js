// authMiddleware.js
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provsecided" });
        }

        const decodedData = jwt.verify(token, secret);
        req.user = decodedData.user;


        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
};