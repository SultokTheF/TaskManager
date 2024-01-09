const Router = require("express");
const controller = require("./Controller");
const { check } = require("express-validator");
const authMiddleware = require("./middleware/authMiddleware");


const router = new Router();

router.post("/register", [
    check("username", "Username is required").notEmpty(),
    check("email", "email is required").notEmpty(),
    check("firstname", "Firstname is required").notEmpty(),
    check("lastname", "Lastname is required").notEmpty(),
    check("password", "Password is required").isLength({min:4, max:10})
],controller.register);
router.post("/login", [
    check("username", "Username is required").notEmpty(),
    check("password", "Password is required").notEmpty()
], controller.login);

router.get("/users", authMiddleware, controller.getUsers);
router.get("/user", authMiddleware, controller.getUserByToken);
router.post("/refreshToken", authMiddleware, controller.refreshToken); 


module.exports = router;