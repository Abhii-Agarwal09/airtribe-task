import { db } from "../index.js";

const newRegisteration = async (req, res) => {
  try {
    const { courseId, learnerId } = req.body;
    let sql = "SELECT * FROM courses WHERE id = ?";
    const [isCourseExistsResult] = await db.query(sql, [courseId]);
    if (isCourseExistsResult.length === 0) {
      return res.json({ success: false, message: "Course does not exist", data: { isCourseExistsResult } });
    }
    sql = "SELECT * FROM learners WHERE id = ?";
    const [isLearnerExistsResult] = await db.query(sql, [learnerId]);
    if (isLearnerExistsResult.length === 0) {
      return res.json({ success: false, message: "Course does not exist", data: { isLearnerExistsResult } });
    }
    sql = "INSERT INTO registrations(course_id, learner_id) VALUES (?, ?)";
    const [createRegisterationResult] = await db.query(sql, [courseId, learnerId]);
    res.json({ success: true, message: "Registration successfully created", data: createRegisterationResult });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "There was an error", data: err.message });
  }
};

const editRegisteration = async (req, res) => {
  try {
    const { registerationId, status } = req.body;
    let sql = "SELECT * FROM registrations WHERE id = ?";
    const [isRegisterationExists] = await db.query(sql, [registerationId]);
    if (isRegisterationExists.length === 0) {
      return res.json({ success: false, message: "Registration does not exist.", data: isRegisterationExists });
    }
    sql = "UPDATE registrations SET status = ? WHERE id = ?";
    const [updateRegistrationResult] = await db.query(sql, [status, registerationId]);
    res.json({ success: true, message: "Registeration updated", data: updateRegistrationResult });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "There was an error", data: err.message });
  }
};

export { newRegisteration, editRegisteration };
