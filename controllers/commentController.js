import { db } from "../index.js";

/**
 * Add a new comment by an instructor for a specific learner.
 *
 * @param {number} learnerId - The ID of the learner for whom the comment is added.
 * @param {number} instructorId - The ID of the instructor adding the comment.
 * @param {string} comment - The text of the comment.
 * @returns {Object} - An object representing the result of the operation.
 *
 * @throws {Error} - Throws an error if there is an issue with the database query.
 */
const newComment = async (req, res) => {
  try {
    const { learnerId, instructorId, comment } = req.body;
    let sql = "SELECT * FROM learners WHERE id = ?";
    const [isLearnerExists] = await db.query(sql, [learnerId]);
    if (isLearnerExists.length === 0) {
      return res.json({ success: false, message: "Learner does not exist", data: isLearnerExists });
    }
    sql = "SELECT * FROM instructors WHERE id = ?";
    const [isInstructorExists] = await db.query(sql, [instructorId]);
    if (isInstructorExists.length === 0) {
      return res.json({ success: false, message: "Instructor does not exist", data: isInstructorExists });
    }
    sql = "INSERT INTO comments(learner_id, instructor_id, comment_text) VALUES(?, ?, ?)";
    const [postCommentResult] = await db.query(sql, [learnerId, instructorId, comment]);
    res.json({ success: true, message: "Comment added successfully", data: postCommentResult });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "There was an error", data: err.message });
  }
};

export { newComment };
