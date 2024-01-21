const Router = require("express");
const { check } = require("express-validator");

const authMiddleware = require("./middleware/authMiddleware");
const authController = require("./controllers/authControllers");
const userController = require("./controllers/userControlllers");
const projectController = require("./controllers/projectControllers");
const taskController = require("./controllers/taskControllers");

const router = new Router();

// Authentication routes
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

router.post("/token/refresh", authMiddleware, authController.refreshToken);

// User-related routes
router.get("/users", authMiddleware, userController.getUsers);
router.get("/user", authMiddleware, userController.getUserByToken);

//Project-related routes
router.post("/projects", authMiddleware, projectController.createProject);
router.get("/projects", authMiddleware, projectController.getProjects);
router.get("/projects/:projectId", authMiddleware, projectController.getProjectById);
router.put("/projects/:projectId", authMiddleware, projectController.updateProject);
router.delete("/projects/:projectId", authMiddleware, projectController.deleteProject);

// Task-related routes
router.post("/tasks", authMiddleware, taskController.createTask);
router.get("/tasks", authMiddleware, taskController.getTasks);
router.get("/tasks/:taskId", authMiddleware, taskController.getTaskById);
router.put("/tasks/:taskId", authMiddleware, taskController.updateTask);
router.delete("/tasks/:taskId", authMiddleware, taskController.deleteTask);

module.exports = router;
