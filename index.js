import "dotenv/config";
import express from "express";
import mysql from "mysql2";

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

(() => {
  const sql = "CREATE DATABASE IF NOT EXISTS airtribe";
  db.query(sql, (err, _) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Database created successfully");
  });
  const usesql = "USE airtribe";
  db.query(usesql, (err, _) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Using airtribe database");
  });
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

app.get("/", (_, res) => {
  res.json({ success: true, message: "Welcome to Airtribe", data: {} });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));