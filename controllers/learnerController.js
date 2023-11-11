import { db } from "../index.js";

const getLearner = async (req, res) => {
  try {
    const { name, email } = req.body;
    const sql = "SELECT * FROM learners WHERE name = ? AND email = ?";
    const values = [name, email];
    const [result] = await db.query(sql, values);
    if (result.length === 0) {
      return res.json({ success: false, message: "Couldn't find learner'", data: result });
    }
    res.json({ success: true, message: "Learner found", data: result });
  } catch (err) {
    console.error(err);
  }
};

const newLearner = async (req, res) => {
  try {
    const { name, email, linkedin, phone } = req.body;
    let sql = "SELECT * FROM learners WHERE email = ?";
    let values = [email];
    const [result] = await db.query(sql, values);
    if (result.length && result.length > 0) {
      return res.json({ success: true, message: "Learner already exists", data: result });
    }
    sql = "INSERT INTO learners(name, email, linkedin_profile, phone_number) VALUES(?, ?, ?, ?)";
    values = [name, email, linkedin, phone];
    const [insertResult] = await db.query(sql, values);
    res.json({ success: true, message: "Learner created.", data: insertResult });
  } catch (err) {
    console.error(err);
  }
};

export { getLearner, newLearner };
