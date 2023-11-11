import "dotenv/config";
import express from "express";
import mysql from "mysql2/promise";
import { learnerRouter, instructorRouter, courseRouter, commentRouter, registerationRouter } from "./routes/index.js";

const app = express();

export const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

(async () => {
  const sql = "CREATE DATABASE IF NOT EXISTS airtribe";
  const [res] = await db.query(sql);
  if (res) console.log("Database created successfully");
  const usesql = "USE airtribe";
  const [useRes] = await db.query(usesql);
  if (useRes) console.log("Using airtribe database");
})();

// connect
db.connect((err) => {
  if (err) {
    console.log("Error connecting to database: ", err);
    return;
  }
  console.log("Database connected");
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/learner", learnerRouter);
app.use("/api/instructor", instructorRouter);
app.use("/api/course", courseRouter);
app.use("/api/comment", commentRouter);
app.use("/api/registeration", registerationRouter);

// Home route
app.get("/", (_, res) => {
  res.json({ success: true, message: "Welcome to Airtribe", data: {} });
});

// Starting the app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
