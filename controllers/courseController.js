import { db } from "../index.js";

const getCourse = async (req, res) => {
  try {
    const { courseName, instructorId } = req.body;
    let sql =
      "SELECT * FROM courses LEFT JOIN instructors ON courses.instructor_id = instructors.id WHERE course_name = ? AND instructor_id = ?;";
    let values = [courseName, instructorId];
    const [result] = await db.query(sql, values);
    if (result.length === 0) {
      return res.json({ success: true, message: "Course not found", data: result });
    }
    res.json({ success: true, message: "Course found.", data: result });
  } catch (err) {
    console.error(err);
  }
};

const newCourse = async (req, res) => {
  try {
    const { courseName, instructorEmail, startDate, maxSeats, description } = req.body;
    const [instructorIdResult] = await db.query("SELECT id FROM instructors WHERE email = ?", [instructorEmail]);
    if (instructorIdResult.length && instructorIdResult.length === 0) {
      return res.json({
        success: false,
        message: "Instructor not found, cannot create the course.",
        data: instructorIdResult,
      });
    }
    const instructorId = instructorIdResult[0].id;
    const [courseExistsResult] = await db.query("SELECT * FROM courses WHERE course_name = ? AND instructor_id = ?", [
      courseName,
      instructorId,
    ]);
    if (courseExistsResult.length > 0) {
      return res.json({ success: false, message: "Course already exists", data: courseExistsResult });
    }
    const [insertCourseResult] = await db.query(
      "INSERT INTO courses (course_name, instructor_id, start_date, max_seats, description) VALUES (?, ?, ?, ?, ?)",
      [courseName, instructorId, startDate, maxSeats, description]
    );
    if (insertCourseResult.length === 0) {
      return res.json({ success: false, message: "There was an error", data: insertCourseResult });
    }
    return res.json({ success: true, message: "Course was successfully added.", data: insertCourseResult });
  } catch (err) {
    console.error(err);
    return res.json({ success: false, message: "There was an error", data: err.message });
  }
};

export { getCourse, newCourse };
