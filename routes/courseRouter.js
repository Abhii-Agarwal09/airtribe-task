import express from "express";
import { getCourse, newCourse, editCourse } from "../controllers/index.js";
const courseRouter = express.Router();

courseRouter.get("/", getCourse).post("/", newCourse).put("/", editCourse);

export { courseRouter };
