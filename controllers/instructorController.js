import { db } from "../index.js";

const getInstructor = async (req, res) => {
  try {
    const { name, email } = req.body;
    let sql = "SELECT * FROM instructors WHERE name = ? and email = ?";
    let values = [name, email];
    const [result] = await db.query(sql, values);
    if (result.length === 0) {
      return res.json({ success: false, message: "Couldn't find instructor'", data: result });
    }
    res.json({ success: true, message: "Instructor found", data: result });
  } catch (err) {
    console.error(err);
  }
};

const newInstructor = async (req, res) => {
  try {
    let { name, email } = req.body;
    let sql = "SELECT * FROM instructors WHERE name = ? and email = ?";
    let values = [name, email];
    const [result] = await db.query(sql, values);
    if (result.length && result.length > 0) {
      return res.json({ success: true, message: "Instructor already exists", data: result });
    }
    sql = "INSERT INTO instructors(name, email) VALUES (?, ?)";
    const [createInstructorResult] = await db.query(sql, values);
    return res.json({ success: true, message: "Instructor created", data: createInstructorResult });
  } catch (err) {
    console.error(err);
  }
};

export { getInstructor, newInstructor };
