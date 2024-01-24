const Router = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const authAdminMiddleware = require("../middlewares/authAdminMiddleware");
const userControllers = require("../controllers/userControlllers");

const router = new Router();

router.get("/", authAdminMiddleware, userControllers.getUsers);
router.get("/user", authMiddleware, userControllers.getUserByToken);
router.get("/:username", authMiddleware, userControllers.getUserByUsername);

module.exports = router;
