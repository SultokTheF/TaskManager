const jwt = require("jsonwebtoken");
const { secret } = require("../config"); // Randomply generate jwt secret key

module.exports = function(req, res, next) {
    if(req.method === "OPTIONS") { // This function should be in each middleware in order to pass to the next middleware
        next(); 
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token) {
            return res.status(400).json({message: "not authorized"});
        }
        const decodeData = jwt.verify(token, secret);

        req.user = decodeData;

        next();
    } catch (e) {
        console.log(e);
        return res.status(400).json({message: "not authorized"});
    }
}