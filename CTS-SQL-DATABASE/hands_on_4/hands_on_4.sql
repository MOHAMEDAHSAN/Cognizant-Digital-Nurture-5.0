EXPLAIN FORMAT=JSON
SELECT
    s.first_name,
    s.last_name,
    c.course_name
FROM enrollments e
JOIN students s
ON s.student_id = e.student_id
JOIN courses c
ON c.course_id = e.course_id
WHERE s.enrollment_year = 2022;

-- Step 49:
-- EXPLAIN shows a Table Scan (Full Table Scan)
-- on the students table because there is
-- no index on enrollment_year.

-- Step 50:
-- Estimated execution cost: 2.42
-- Estimated rows examined in students table: 10
-- Because no index exists on enrollment_year,
-- MySQL performs a full table scan before filtering.

CREATE INDEX idx_students_enrollment_year
ON students(enrollment_year);

CREATE UNIQUE INDEX idx_enrollment_student_course
ON enrollments(student_id, course_id);

CREATE INDEX idx_course_code
ON courses(course_code);

EXPLAIN
SELECT
    s.first_name,
    s.last_name,
    c.course_name
FROM enrollments e
JOIN students s
ON s.student_id = e.student_id
JOIN courses c
ON c.course_id = e.course_id
WHERE s.enrollment_year = 2022;

-- Step 54:
-- After creating the indexes, the query optimizer
-- uses the index on students.enrollment_year.
-- This reduces the need for a full table scan
-- and improves query performance.

CREATE INDEX idx_null_grade
ON enrollments(student_id)
WHERE grade IS NULL;

-- Step 55:
-- Partial indexes are supported in PostgreSQL
-- but not in MySQL.
--
-- PostgreSQL syntax:
-- CREATE INDEX idx_null_grade
-- ON enrollments(student_id)
-- WHERE grade IS NULL;
--
-- Therefore this step cannot be implemented
-- in MySQL.