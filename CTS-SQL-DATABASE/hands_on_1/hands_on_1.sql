CREATE DATABASE college_db;

USE college_db;

CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL,
    hod_name VARCHAR(100),
    budget DECIMAL(12,2)
);

CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    date_of_birth DATE,
    department_id INT,
    enrollment_year INT,
    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
);

CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(150) NOT NULL,
    course_code VARCHAR(20) UNIQUE,
    credits INT,
    department_id INT,
    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
);

CREATE TABLE enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    enrollment_date DATE,
    grade CHAR(2),
    FOREIGN KEY (student_id)
        REFERENCES students(student_id),
    FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
);

CREATE TABLE professors (
    professor_id INT AUTO_INCREMENT PRIMARY KEY,
    prof_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    department_id INT,
    salary DECIMAL(10,2),
    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
);


-- ======================================================
-- Task 2: Normalization Analysis
-- ======================================================

-- 1NF (First Normal Form)
-- All tables contain atomic (single) values in each column.
-- Example violation: storing multiple phone numbers in one field
-- such as '9876543210,9123456780' would violate 1NF.

-- 2NF (Second Normal Form)
-- All non-key attributes are fully dependent on the primary key.
-- In the enrollments table, enrollment_date and grade depend
-- on the student-course enrollment and not on only one column.

-- 3NF (Third Normal Form)
-- There are no transitive dependencies.
-- Department details are stored only in the departments table.
-- Students, courses, and professors reference departments
-- using department_id instead of storing department names.

-- Enrollments Table 3NF Analysis:
-- The grade depends directly on the enrollment record.
-- No non-key attribute depends on another non-key attribute.
-- Therefore, the enrollments table satisfies 3NF.

-- ======================================================
-- Task 3: Alter and Extend the Schema
-- ======================================================

ALTER TABLE students
ADD phone_number VARCHAR(15);

ALTER TABLE courses
ADD max_seats INT DEFAULT 60;

ALTER TABLE enrollments
ADD CONSTRAINT chk_grade
CHECK (grade IN ('A','B','C','D','F') OR grade IS NULL);

ALTER TABLE departments
RENAME COLUMN hod_name TO head_of_dept;

ALTER TABLE students
DROP COLUMN phone_number;

-- ======================================================
-- Verification
-- ======================================================


DESCRIBE departments;

DESCRIBE courses;

DESCRIBE students;

DESCRIBE professors;

DESCRIBE enrollments;