import { Router } from "express";
import { createUserValidations } from "../models/validations/user-validations.js";
import { ctrlCreateUser, ctrlGetUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/register",createUserValidations ,ctrlCreateUser);
userRouter.get("/user", ctrlGetUser)


export { userRouter };