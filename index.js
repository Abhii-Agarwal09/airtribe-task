import "dotenv/config";
import express from "express";
import mysql from "mysql2/promise";
import { learnerRouter, instructorRouter, courseRouter } from "./routes/index.js";

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
  // db.query(sql, (err, _) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   console.log("Database created successfully");
  // });
  const usesql = "USE airtribe";
  const [useRes] = await db.query(usesql);
  if (useRes) console.log("Using airtribe database");
  // db.query(usesql, (err, _) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   console.log("Using airtribe database");
  // });
})();

// connect
db.connect((err) => {
  if (err) {
    console.log("Error connecting to database: ", err);
    return;
  }
  console.log("Database connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/learner", learnerRouter);
app.use("/api/instructor", instructorRouter);
app.use("/api/course", courseRouter);

app.get("/", (_, res) => {
  res.json({ success: true, message: "Welcome to Airtribe", data: {} });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
