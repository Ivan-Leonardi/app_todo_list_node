import { Router } from "express";
import CreateTaskController from "../../controllers/tasks/create-tasks.js";
import ensureAuthenticated from "../../middlewares/ensureAuthenticated.js";
import GetAllTasksController from "../../controllers/tasks/get-all-tasks.js";

const tasksRoutes = Router();

const createTaskController = new CreateTaskController();
const getAllTaskController = new GetAllTasksController();

tasksRoutes.use(ensureAuthenticated);

tasksRoutes.post('/', createTaskController.create);
tasksRoutes.get('/', getAllTaskController.getAll)

export default tasksRoutes;