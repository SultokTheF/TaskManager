const Router = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const authAdminMiddleware = require("../middlewares/authAdminMiddleware");
const userControllers = require("../controllers/userControlllers");

const router = new Router();

router.get("/", authAdminMiddleware, userControllers.getUsers);
router.get("/user", authMiddleware, userControllers.getUserByToken);
router.get("/:userId", authMiddleware, userControllers.getUserById);
router.get("/user/:username", authMiddleware, userControllers.getUserByUsername);
router.put("/update/:userId", authMiddleware, userControllers.updateUser);

module.exports = router;
