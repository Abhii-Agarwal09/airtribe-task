import { db } from "../index.js";

const getLearner = (req, res) => {
  try {
    const { name, email } = req.body;
    const sql = "SELECT * FROM learners WHERE name = ? AND email = ?";
    const values = [name, email];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ success: false, message: "There was an error", data: err.message });
      }
      res.json({ success: true, message: "Learner found", data: result });
    });
  } catch (err) {
    console.error(err);
  }
};

const newLearner = (req, res) => {
  try {
    const { name, email, linkedin, phone } = req.body;
    let sql = "SELECT * FROM learners WHERE email = ?";
    let values = [email];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ success: false, message: "There was an error", data: err.message });
      }
      if (result.length && result.length > 0) {
        return res.json({ success: true, message: "Learner already exists", data: result });
      }
      sql = "INSERT INTO learners(name, email, linkedin_profile, phone_number) VALUES(?, ?, ?, ?)";
      values = [name, email, linkedin, phone];
      db.query(sql, values, (err, result) => {
        if (err) {
          console.log(err);
          return res.json({ success: false, message: "There was an error", data: err.message });
        }
        res.json({ success: true, message: "Learner created.", data: result });
      });
    });
  } catch (err) {
    console.error(err);
  }
};

export { getLearner, newLearner };
