import { Router } from "express";
import CreateUserController from "../../controllers/users/create-user.js";

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post("/", createUserController.create);

export default userRoutes;
