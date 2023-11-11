import express from "express";
import { newRegisteration, editRegisteration } from "../controllers/index.js";
const registerationRouter = express.Router();

registerationRouter.post("/", newRegisteration).patch("/", editRegisteration);

export { registerationRouter };
