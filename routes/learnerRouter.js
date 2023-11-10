import express from "express";
import { getLearner, newLearner } from "../controllers/index.js";
const learnerRouter = express.Router();

learnerRouter.get("/", getLearner).post("/", newLearner);

export { learnerRouter };
