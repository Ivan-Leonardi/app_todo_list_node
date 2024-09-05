import { Router } from "express";

import userRoutes from "./routes-users.js";
import sessionRoutes from "./routes.sessions.js";


const routes = Router();

routes.use('/users', userRoutes);
routes.use('/sessions', sessionRoutes)

export default routes;