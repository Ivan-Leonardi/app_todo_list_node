import { Router } from "express";
import UserLoginController from "../../controllers/users/session-user.js";

const userLoginController = new UserLoginController();

const sessionRoutes = Router();


sessionRoutes.post('/', userLoginController.create);

export default sessionRoutes;