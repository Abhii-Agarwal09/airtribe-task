import { db } from "../index.js";

/**
 * Retrieve learner information based on name and email.
 *
 * @param {string} name - The name of the learner.
 * @param {string} email - The email of the learner.
 * @returns {Object} - An object representing the result of the operation. In case of successful retriving of learner, it returns the learner
 *
 * @throws {Error} - Throws an error if there is an issue with the database query.
 */
const getLearner = async (req, res) => {
  try {
    const { name, email } = req.body;
    const sql = "SELECT * FROM learners WHERE name = ? AND email = ?";
    const values = [name, email];
    const [getLearnerResult] = await db.query(sql, values);
    // In case learner is not found
    if (getLearnerResult.length === 0) {
      return res.json({ success: false, message: "Couldn't find learner'", data: getLearnerResult });
    }
    // Learner found
    res.json({ success: true, message: "Learner found", data: getLearnerResult[0] });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "There was an error", data: err.message });
  }
};

/**
 * Create a new learner with the provided information.
 *
 * @param {string} name - The name of the learner.
 * @param {string} email - The email of the learner.
 * @param {string} linkedin - The LinkedIn profile URL of the learner.
 * @param {string} phone - The phone number of the learner.
 * @returns {Object} - An object representing the result of the operation.
 *
 * @throws {Error} - Throws an error if there is an issue with the database query.
 */
const newLearner = async (req, res) => {
  try {
    const { name, email, linkedin, phone } = req.body;
    let sql = "SELECT * FROM learners WHERE email = ?";
    let values = [email];
    const [ifLearnerExistsResult] = await db.query(sql, values);
    // Check if learner already exists
    if (ifLearnerExistsResult.length && ifLearnerExistsResult.length > 0) {
      return res.json({ success: false, message: "Learner already exists", data: ifLearnerExistsResult[0] });
    }
    // Create new learner
    sql = "INSERT INTO learners(name, email, linkedin_profile, phone_number) VALUES(?, ?, ?, ?)";
    values = [name, email, linkedin, phone];
    const [insertLearnerResult] = await db.query(sql, values);
    res.json({ success: true, message: "Learner created.", data: insertLearnerResult });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "There was an error", data: err.message });
  }
};

export { getLearner, newLearner };
