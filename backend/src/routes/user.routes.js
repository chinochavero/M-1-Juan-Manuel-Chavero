import { Router } from "express";
import { createUserValidations } from "../models/validations/user-validations.js";
import { ctrlCreateUser, ctrlFindOneUser, ctrlListUsers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/register",createUserValidations ,ctrlCreateUser);
userRouter.get("/user", ctrlListUsers);

userRouter.get("/user/:userId", ctrlFindOneUser)


export { userRouter };