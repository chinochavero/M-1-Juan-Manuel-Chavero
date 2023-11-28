import { Router } from "express";
import { ctrlCreatePost, ctrlDeletePost, ctrlGetPost, ctrlListPost, ctrlupdatePost } from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.post("/", ctrlCreatePost);
postRouter.get("/", ctrlListPost);

postRouter.get("/:postId", ctrlGetPost);
postRouter.patch("/:postId", ctrlupdatePost);
postRouter.delete("/:postId",ctrlDeletePost);

export { postRouter }