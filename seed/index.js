import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config({ path: "../.env" });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");

  // Create database
  const createDatabase = "CREATE DATABASE IF NOT EXISTS Airtribe";
  db.query(createDatabase, (err) => {
    if (err) throw err;
    console.log("Created database Airtribe");
  });
  // Use database
  db.query("USE Airtribe", (err) => {
    if (err) throw err;
    console.log("Using database Airtribe");
  });

  // Create Instructors table
  const createInstructorsTable = `
    CREATE TABLE IF NOT EXISTS Instructors (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL
    )
  `;
  db.query(createInstructorsTable, (err) => {
    if (err) throw err;
    console.log("Instructors table created");

    // Insert dummy instructors
    const insertInstructors = `
      INSERT INTO Instructors (name, email) VALUES
        ('Abhishek', 'abhishek@gmail.com'),
        ('Pratham', 'pratham@gmail.com');
    `;
    db.query(insertInstructors, (err) => {
      if (err) throw err;
      console.log("Dummy instructors inserted");
    });
  });

  // Create Learners table
  const createLearnersTable = `
    CREATE TABLE IF NOT EXISTS Learners (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      linkedin_profile VARCHAR(255) NOT NULL,
      phone_number VARCHAR(20) NOT NULL
    )
  `;
  db.query(createLearnersTable, (err) => {
    if (err) throw err;
    console.log("Learners table created");

    // Insert dummy learners
    const insertLearners = `
      INSERT INTO Learners (name, email, linkedin_profile, phone_number) VALUES
        ('Rahul', 'rahul@gmail.com', 'linkedin.com/rahul', '9634717667'),
        ('Jeet', 'jeet@gmail.com', 'linkedin.com/jeet', '9634717667'),
        ('Harsh', 'harsh@gmail.com', 'linkedin.com/harsh', '9634717667');
    `;
    db.query(insertLearners, (err) => {
      if (err) throw err;
      console.log("Dummy learners inserted");
    });
  });

  // Create Courses table
  const createCoursesTable = `
    CREATE TABLE IF NOT EXISTS Courses (
      id INT PRIMARY KEY AUTO_INCREMENT,
      course_name VARCHAR(255) NOT NULL,
      start_date DATE NOT NULL,
      max_seats INT NOT NULL,
      instructor_id INT,
      is_open BOOLEAN DEFAULT true,
      description TEXT,
      FOREIGN KEY (instructor_id) REFERENCES Instructors(id) ON DELETE CASCADE
    )
  `;
  db.query(createCoursesTable, (err) => {
    if (err) throw err;
    console.log("Courses table created");

    // Insert dummy courses
    const insertCourses = `
      INSERT INTO Courses (course_name, start_date, max_seats, instructor_id, is_open, description) VALUES
        ('Web Development', '2023-01-01', 20, 1, true, 'Learn web development'),
        ('Data Science', '2023-02-01', 15, 2, true, 'Explore data science concepts'),
        ('DSA', '2023-02-01', 15, 2, true, 'Explore DSA concepts');
    `;
    db.query(insertCourses, (err) => {
      if (err) throw err;
      console.log("Dummy courses inserted");
    });
  });
  // Create Registrations table
  const createRegistrationsTable = `
    CREATE TABLE IF NOT EXISTS Registrations (
      id INT PRIMARY KEY AUTO_INCREMENT,
      course_id INT,
      learner_id INT,
      status ENUM('Pending', 'Accepted', 'Rejected', 'Waitlisted') DEFAULT 'Pending',
      FOREIGN KEY (course_id) REFERENCES Courses(id) ON DELETE CASCADE,
      FOREIGN KEY (learner_id) REFERENCES Learners(id) ON DELETE CASCADE
    )
  `;
  db.query(createRegistrationsTable, (err) => {
    if (err) throw err;
    console.log("Registrations table created");

    // Insert dummy registrations
    const insertRegistrations = `
      INSERT INTO Registrations (course_id, learner_id, status) VALUES
        (1, 1, 'Accepted'),
        (1, 2, 'Pending'),
        (2, 1, 'Rejected'),
        (2, 2, 'Waitlisted')
    `;
    db.query(insertRegistrations, (err) => {
      if (err) throw err;
      console.log("Dummy registrations inserted");
    });
  });

  // Create Comments table
  const createCommentsTable = `
    CREATE TABLE IF NOT EXISTS Comments (
      id INT PRIMARY KEY AUTO_INCREMENT,
      learner_id INT,
      instructor_id INT,
      comment_text TEXT NOT NULL,
      FOREIGN KEY (learner_id) REFERENCES Learners(id) ON DELETE CASCADE,
      FOREIGN KEY (instructor_id) REFERENCES Instructors(id) ON DELETE CASCADE
    )
  `;
  db.query(createCommentsTable, (err) => {
    if (err) throw err;
    console.log("Comments table created");

    // Insert dummy comments
    const insertComments = `
      INSERT INTO Comments (learner_id, instructor_id, comment_text) VALUES
        (1, 1, 'Great progress in the course!'),
        (1, 2, 'Keep up the good work!'),
        (2, 1, 'Excellent participation'),
        (2, 2, 'Needs improvement in some areas')
    `;
    db.query(insertComments, (err) => {
      if (err) throw err;
      console.log("Dummy comments inserted");

      // Close the connection
      db.end((err) => {
        if (err) throw err;
        console.log("Connection closed");
      });
    });
  });
});
