import { getInstructorId } from "../helpers/index.js";
import { db } from "../index.js";

/**
 * Retrieve course information based on course name and instructor ID.
 *
 * @param {string} courseName - The name of the course.
 * @param {number} instructorId - The ID of the instructor associated with the course.
 * @returns {Object} - An object representing the result of the operation.
 *
 * @throws {Error} - Throws an error if there is an issue with the database query.
 */
const getCourse = async (req, res) => {
  try {
    const { courseName, instructorId } = req.body;
    let sql =
      "SELECT * FROM courses LEFT JOIN instructors ON courses.instructor_id = instructors.id WHERE course_name = ? AND instructor_id = ?;";
    let values = [courseName, instructorId];
    const [ifCourseExistsResult] = await db.query(sql, values);
    if (ifCourseExistsResult.length === 0) {
      return res.json({ success: false, message: "Course not found", data: ifCourseExistsResult });
    }
    res.json({ success: true, message: "Course found.", data: ifCourseExistsResult[0] });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "There was an error", data: err.message });
  }
};

/**
 * Create a new course with the provided details.
 *
 * @param {string} courseName - The name of the course.
 * @param {string} instructorEmail - The email of the instructor associated with the course.
 * @param {string} startDate - The start date of the course.
 * @param {number} maxSeats - The maximum number of seats available for the course.
 * @param {string} description - A description of the course.
 * @returns {Object} - An object representing the result of the operation.
 *
 * @throws {Error} - Throws an error if there is an issue with the database query.
 */
const newCourse = async (req, res) => {
  try {
    const { courseName, instructorEmail, startDate, maxSeats, description } = req.body;
    const instructorId = await getInstructorId(instructorEmail);
    // Check if the instructor exists
    if (!instructorId) {
      return res.json({ success: false, message: "Instructor not found, cannot create course", data: null });
    }
    const [courseExistsResult] = await db.query("SELECT * FROM courses WHERE course_name = ? AND instructor_id = ?", [
      courseName,
      instructorId,
    ]);
    // Check if course exists
    if (courseExistsResult.length > 0) {
      return res.json({ success: false, message: "Course already exists", data: courseExistsResult[0] });
    }
    // Create new course
    const [insertCourseResult] = await db.query(
      "INSERT INTO courses (course_name, instructor_id, start_date, max_seats, description) VALUES (?, ?, ?, ?, ?)",
      [courseName, instructorId, startDate, maxSeats, description]
    );
    if (insertCourseResult.length === 0) {
      return res.json({ success: false, message: "There was an error", data: insertCourseResult });
    }
    return res.json({ success: true, message: "Course was successfully added.", data: insertCourseResult[0] });
  } catch (err) {
    console.error(err);
    return res.json({ success: false, message: "There was an error", data: err.message });
  }
};

/**
 * Edit course details with the provided information.
 *
 * @param {string} courseName - The updated name of the course.
 * @param {string} instructorEmail - The email of the instructor associated with the course.
 * @param {string} startDate - The updated start date of the course.
 * @param {number} maxSeats - The updated maximum number of seats available for the course.
 * @param {string} description - The updated description of the course.
 * @param {boolean} isOpen - The updated status indicating whether the course is open.
 * @returns {Object} - An object representing the result of the operation.
 *
 * @throws {Error} - Throws an error if there is an issue with the database query.
 */
const editCourse = async (req, res) => {
  try {
    const { courseName, instructorEmail, startDate, maxSeats, description, isOpen } = req.body;
    const instructorId = await getInstructorId(instructorEmail);
    // Check if the instructor exists
    if (!instructorId) {
      return res.json({ success: false, message: "Instructor not found, cannot edit course", data: null });
    }
    // Edit the course
    let sql =
      "UPDATE courses set course_name = ?, start_date = ?, max_seats = ?, description = ?, is_open = ? WHERE instructor_id = ?";
    let values = [courseName, startDate, maxSeats, description, isOpen, instructorId];
    const [updateCourseResult] = await db.query(sql, values);
    res.json({ success: true, message: "Course updated successfully", data: updateCourseResult });
  } catch (err) {
    console.error(err);
    return res.json({ success: false, message: "There was an error", data: err.message });
  }
};

export { getCourse, newCourse, editCourse };
