import { Router } from "express";
import { createCommentValidation, getCommentValidation, listCommentValidation } from "../models/validations/comment-validation.js";
import { ctrlCreateComment, ctrlGetCommentById, ctrlListComments } from "../controllers/comment.controller.js";

const commentRouter = Router();

commentRouter.post("/:postId/", createCommentValidation, ctrlCreateComment);
commentRouter.get("/:postId/", listCommentValidation ,ctrlListComments );
commentRouter.get("/:postId/:commentId", getCommentValidation, ctrlGetCommentById);
                   
export { commentRouter };