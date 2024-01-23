const Router = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const taskController = require("../controllers/taskControllers");

const router = new Router();

router.post("/tasks", authMiddleware, taskController.createTask);
router.get("/tasks", authMiddleware, taskController.getTasks);
router.get("/tasks/:taskId", authMiddleware, taskController.getTaskById);
router.put("/tasks/:taskId", authMiddleware, taskController.updateTask);
router.delete("/tasks/:taskId", authMiddleware, taskController.deleteTask);

module.exports = router;
