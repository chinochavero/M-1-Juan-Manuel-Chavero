import { Router } from "express";
import { ctrlCreatePost } from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.post("/", ctrlCreatePost)

export { postRouter }