import { db } from "../index.js";

const getInstructor = (req, res) => {
  try {
    const { name, email } = req.body;
    let sql = "SELECT * FROM instructors WHERE name = ? and email = ?";
    let values = [name, email];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ success: false, message: "There was an error", data: err.message });
      }
      res.json({ success: true, message: "Instructor found", data: result });
    });
  } catch (err) {
    console.error(err);
  }
};

const newInstructor = (req, res) => {
  try {
    let { name, email } = req.body;
    let sql = "SELECT * FROM instructors WHERE name = ? and email = ?";
    let values = [name, email];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ success: false, message: "There was an error", data: err.message });
      }
      if (result.length && result.length > 0) {
        return res.json({ success: true, message: "Instructor already exists", data: result });
      }
      sql = "INSERT INTO instructors(name, email) VALUES (?, ?)";
      db.query(sql, values, (err, result) => {
        if (err) {
          console.log(err);
          return res.json({ success: false, message: "There was an error", data: err.message });
        }
        return res.json({ success: true, message: "Instructor created", data: result });
      });
    });
  } catch (err) {
    console.error(err);
  }
};

export { getInstructor, newInstructor };
