import { Router } from "express";

import tasksRouter from "./routes-tasks.js";

const routesTasks = Router();

routesTasks.use('/tasks', tasksRouter);

export default routesTasks;

