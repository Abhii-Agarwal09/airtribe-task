import express from "express";
import { newComment } from "../controllers/index.js";
const commentRouter = express.Router();

commentRouter.post("/", newComment);

export { commentRouter };
