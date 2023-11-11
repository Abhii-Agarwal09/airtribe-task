import { db } from "../index.js";

/**
 * Retrieve instructor information based on name and email.
 *
 * @param {string} name - The name of the instructor.
 * @param {string} email - The email of the instructor.
 * @returns {Object} - An object representing the result of the operation.
 *
 * @throws {Error} - Throws an error if there is an issue with the database query.
 */
const getInstructor = async (req, res) => {
  try {
    const { name, email } = req.body;
    let sql = "SELECT * FROM instructors WHERE name = ? and email = ?";
    let values = [name, email];
    const [getInstructorResult] = await db.query(sql, values);
    // If instructor was not found
    if (getInstructorResult.length === 0) {
      return res.json({ success: false, message: "Couldn't find instructor'", data: getInstructorResult });
    }
    // Instructor found
    res.json({ success: true, message: "Instructor found", data: getInstructorResult[0] });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "There was an error", data: err.message });
  }
};

/**
 * Create a new instructor with the provided name and email.
 *
 * @param {string} name - The name of the instructor.
 * @param {string} email - The email of the instructor.
 * @returns {Object} - An object representing the result of the operation.
 *
 * @throws {Error} - Throws an error if there is an issue with the database query.
 */
const newInstructor = async (req, res) => {
  try {
    let { name, email } = req.body;
    let sql = "SELECT * FROM instructors WHERE name = ? and email = ?";
    let values = [name, email];
    const [ifInstructorExistsResult] = await db.query(sql, values);
    // Check if insrutor exists
    if (ifInstructorExistsResult.length && ifInstructorExistsResult.length > 0) {
      return res.json({ success: false, message: "Instructor already exists", data: ifInstructorExistsResult[0] });
    }
    // Create new instructor
    sql = "INSERT INTO instructors(name, email) VALUES (?, ?)";
    const [createInstructorResult] = await db.query(sql, values);
    return res.json({ success: true, message: "Instructor created", data: createInstructorResult });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "There was an error", data: err.message });
  }
};

export { getInstructor, newInstructor };
