const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const { generateAccessToken } = require("../Controller"); 

module.exports = async function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken) {
                return res.status(400).json({ message: "Unauthorized - No token provided" });
            }

            const decodedRefreshToken = jwt.verify(refreshToken, secret);

            const newAccessToken = generateAccessToken(decodedRefreshToken.user);

            res.setHeader("Authorization", "Bearer " + newAccessToken);

            next();
        } else {
            const decodedData = jwt.verify(token, secret);
            req.user = decodedData.user;

            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Unauthorized - Invalid token" });
    }
};