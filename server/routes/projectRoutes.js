const Router = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const projectController = require("../controllers/projectControllers");

const router = new Router();

router.post("/", authMiddleware, projectController.createProject);
router.get("/", authMiddleware, projectController.getProjects);
router.get("/:projectId", authMiddleware, projectController.getProjectById);
router.put("/:projectId", authMiddleware, projectController.updateProject);
router.delete("/:projectId", authMiddleware, projectController.deleteProject);

router.post("/assignUserToProject", authMiddleware, projectController.assignUserToProject);
router.post('/removeUserFromProject', authMiddleware, projectController.removeUserFromProject);


module.exports = router;
