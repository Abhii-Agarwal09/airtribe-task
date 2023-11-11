import { db } from "../index.js";

/**
 * Create a new registration for a learner in a specific course.
 *
 * @param {number} courseId - The ID of the course for which the registration is created.
 * @param {number} learnerId - The ID of the learner registering for the course.
 * @returns {Object} - An object representing the result of the operation.
 *
 * @throws {Error} - Throws an error if there is an issue with the database query.
 */
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
      return res.json({ success: false, message: "Learner does not exist", data: { isLearnerExistsResult } });
    }
    sql = "INSERT INTO registrations(course_id, learner_id) VALUES (?, ?)";
    const [createRegisterationResult] = await db.query(sql, [courseId, learnerId]);
    res.json({ success: true, message: "Registration successfully created", data: createRegisterationResult });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "There was an error", data: err.message });
  }
};

/**
 * Update the status of a registration for a specific learner in a course.
 *
 * @param {number} registrationId - The ID of the registration to be updated.
 * @param {string} status - The updated status of the registration (e.g., "accepted", "rejected", "waitlisted").
 * @returns {Object} - An object representing the result of the operation.
 *
 * @throws {Error} - Throws an error if there is an issue with the database query.
 */
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
