import { db } from "../index.js";

const getInstructorId = async (instructorEmail) => {
  try {
    let sql = "SELECT id FROM instructors WHERE email = ?";
    const [getInstructorResult] = await db.query(sql, [instructorEmail]);
    // Check if instructor exists
    if (getInstructorResult.length === 0) {
      return null;
    }
    // Extract instructor id
    let instructorId = getInstructorResult[0].id;
    return instructorId;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export { getInstructorId };
