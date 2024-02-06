const Router = require("express");
const { check } = require("express-validator");

const authMiddleware = require("../middlewares/authMiddleware");
const authController = require("../controllers/authControllers");

const router = new Router();

router.post("/register", [
  check("username", "Username is required").notEmpty(),
  check("email", "Email is required").notEmpty(),
  check("firstname", "Firstname is required").notEmpty(),
  check("lastname", "Lastname is required").notEmpty(),
  check("password", "Password must be between 4 and 10 characters").isLength({ min: 4, max: 10 })
], authController.register);

router.post("/login", [
  check("username", "Username is required").notEmpty(),
  check("password", "Password is required").notEmpty()
], authController.login);

router.post("/token/refresh", authController.refreshToken);
router.post("/logout", authController.logout);

module.exports = router;
