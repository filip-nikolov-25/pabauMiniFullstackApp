import { Router } from "express";
import { createPosts, deletePost, getAllPosts, getOnePost, updatePost } from "../controllers/postsController.js";

const postRouter = Router();
postRouter.post("/posts",createPosts)
postRouter.get("/posts",getAllPosts)
postRouter.get("/posts/:id",getOnePost)
postRouter.put("/posts/:id",updatePost)
postRouter.delete("/posts/:id", deletePost);

export default postRouter;