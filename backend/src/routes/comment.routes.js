import { Router } from "express";
import { createCommentValidation } from "../models/validations/comment-validation.js";
import { ctrlCreateComment } from "../controllers/comment.controller.js";

const commentRouter = Router();

commentRouter.post("/", createCommentValidation, ctrlCreateComment);

export { commentRouter };