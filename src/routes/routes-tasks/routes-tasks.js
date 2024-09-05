import { Router } from "express";
import CreateTaskController from "../../controllers/tasks/create-tasks.js";
import ensureAuthenticated from "../../middlewares/ensureAuthenticated.js";
import GetAllTasksController from "../../controllers/tasks/get-all-tasks.js";
import DeleteTaskController from "../../controllers/tasks/delete-tasks.js";
import UpdateTaskController from "../../controllers/tasks/update-tasks.js";
import ShowTaskController from "../../controllers/tasks/show-tasks.js";

const tasksRoutes = Router();

const createTaskController = new CreateTaskController();
const getAllTaskController = new GetAllTasksController();
const deleteTaskController = new DeleteTaskController();
const updateTaskController = new UpdateTaskController();
const showTaskController = new ShowTaskController();

tasksRoutes.use(ensureAuthenticated);

tasksRoutes.post("/", createTaskController.create);
tasksRoutes.get("/", getAllTaskController.getAll);
tasksRoutes.delete("/:id", deleteTaskController.deleteTask);
tasksRoutes.put("/:id", updateTaskController.updateTask);
tasksRoutes.get("/:id", showTaskController.showTask);

export default tasksRoutes;
