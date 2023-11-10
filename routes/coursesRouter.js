import express from "express";
const coursesRouter = express.Router();

coursesRouter.get("/", getCourse).post("/", newCourse).put("/", editCourse);

export default coursesRouter;
