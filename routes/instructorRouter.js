import express from "express";
import { getInstructor, newInstructor } from "../controllers/index.js";
const instructorRouter = express.Router();

instructorRouter.get("/", getInstructor).post("/", newInstructor);

export { instructorRouter };
