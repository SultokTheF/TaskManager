const Router = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const projectController = require("../controllers/projectControllers");

const router = new Router();

router.post("/projects", authMiddleware, projectController.createProject);
router.get("/projects", authMiddleware, projectController.getProjects);
router.get("/projects/:projectId", authMiddleware, projectController.getProjectById);
router.put("/projects/:projectId", authMiddleware, projectController.updateProject);
router.delete("/projects/:projectId", authMiddleware, projectController.deleteProject);

module.exports = router;
