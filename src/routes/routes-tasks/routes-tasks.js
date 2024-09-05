import { Router } from "express";
import CreateTaskController from "../../controllers/tasks/create-tasks.js";
import ensureAuthenticated from "../../middlewares/ensureAuthenticated.js";
import GetAllTasksController from "../../controllers/tasks/get-all-tasks.js";
import DeleteTaskController from "../../controllers/tasks/delete-tasks.js";

const tasksRoutes = Router();

const createTaskController = new CreateTaskController();
const getAllTaskController = new GetAllTasksController();
const deleteTaskController = new DeleteTaskController();

tasksRoutes.use(ensureAuthenticated);

tasksRoutes.post("/", createTaskController.create);
tasksRoutes.get("/", getAllTaskController.getAll);
tasksRoutes.delete("/:id", deleteTaskController.deleteTask);

export default tasksRoutes;
