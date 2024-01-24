const Router = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const taskController = require("../controllers/taskControllers");

const router = new Router();

router.post("/", authMiddleware, taskController.createTask);
router.get("/", authMiddleware, taskController.getTasks);
router.get("/:taskId", authMiddleware, taskController.getTaskById);
router.put("/:taskId", authMiddleware, taskController.updateTask);
router.delete("/:taskId", authMiddleware, taskController.deleteTask);

module.exports = router;
