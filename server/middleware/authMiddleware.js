const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const accessToken = req.headers.authorization.split(" ")[1];
        if (!accessToken) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        const decodedData = jwt.verify(accessToken, secret);
        req.user = decodedData.user;

        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "Unauthorized - No refresh token provided" });
        }

        const decodedRefreshToken = jwt.verify(refreshToken, secret);

        req.refreshTokenUser = decodedRefreshToken.user;

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
};
