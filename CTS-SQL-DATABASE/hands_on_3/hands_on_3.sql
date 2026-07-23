USE college_db;

-- =====================================================
-- TASK 1 : SUBQUERIES
-- =====================================================

-- Step 35

SELECT
    s.student_id,
    s.first_name,
    s.last_name
FROM students s
JOIN enrollments e
ON s.student_id = e.student_id
GROUP BY
    s.student_id,
    s.first_name,
    s.last_name
HAVING COUNT(*) >
(
    SELECT AVG(course_count)
    FROM
    (
        SELECT COUNT(*) AS course_count
        FROM enrollments
        GROUP BY student_id
    ) avg_table
);

--------------------------------------------------------

-- Step 36

SELECT c.course_name
FROM courses c
WHERE NOT EXISTS
(
    SELECT *
    FROM enrollments e
    WHERE e.course_id = c.course_id
    AND e.grade <> 'A'
);

--------------------------------------------------------

-- Step 37

SELECT
    p.prof_name,
    p.department_id,
    p.salary
FROM professors p
WHERE salary =
(
    SELECT MAX(salary)
    FROM professors
    WHERE department_id = p.department_id
);

--------------------------------------------------------

-- Step 38

SELECT *
FROM
(
    SELECT
        department_id,
        AVG(salary) AS avg_salary
    FROM professors
    GROUP BY department_id
) dept_avg
WHERE avg_salary > 85000;





-- =====================================================
-- TASK 2 : VIEWS
-- =====================================================

DROP VIEW IF EXISTS vw_student_enrollment_summary;
DROP VIEW IF EXISTS vw_course_stats;

--------------------------------------------------------

-- Step 39

CREATE VIEW vw_student_enrollment_summary AS

SELECT

s.student_id,

CONCAT(s.first_name,' ',s.last_name) AS student_name,

d.dept_name,

COUNT(e.course_id) AS total_courses,

ROUND(

AVG(

CASE

WHEN e.grade='A' THEN 4
WHEN e.grade='B' THEN 3
WHEN e.grade='C' THEN 2
WHEN e.grade='D' THEN 1
WHEN e.grade='F' THEN 0

END

),2) AS GPA

FROM students s

JOIN departments d

ON s.department_id=d.department_id

LEFT JOIN enrollments e

ON s.student_id=e.student_id

GROUP BY

s.student_id,
student_name,
d.dept_name;

--------------------------------------------------------

-- Step 40

CREATE VIEW vw_course_stats AS

SELECT

c.course_name,

c.course_code,

COUNT(e.student_id) AS total_enrollments,

ROUND(

AVG(

CASE

WHEN e.grade='A' THEN 4
WHEN e.grade='B' THEN 3
WHEN e.grade='C' THEN 2
WHEN e.grade='D' THEN 1
WHEN e.grade='F' THEN 0

END

),2) AS avg_gpa

FROM courses c

LEFT JOIN enrollments e

ON c.course_id=e.course_id

GROUP BY

c.course_id,
c.course_name,
c.course_code;

--------------------------------------------------------

-- Step 41

SELECT *

FROM vw_student_enrollment_summary

WHERE GPA > 3;

--------------------------------------------------------

-- Step 42

UPDATE vw_student_enrollment_summary

SET GPA=4

WHERE student_id=1;

-- Step 42:
-- UPDATE on vw_student_enrollment_summary fails because
-- the view uses JOIN, GROUP BY and aggregate functions.
-- Therefore it is not updatable.

--------------------------------------------------------

-- Step 43

DROP VIEW vw_course_stats;

DROP VIEW vw_student_enrollment_summary;

CREATE VIEW vw_student_enrollment_summary AS

SELECT

student_id,

first_name,

last_name,

enrollment_year

FROM students

WHERE enrollment_year>=2022

WITH CHECK OPTION;

SELECT *

FROM vw_student_enrollment_summary;







-- =====================================================
-- TASK 3 : STORED PROCEDURE
-- =====================================================

DROP PROCEDURE IF EXISTS sp_enroll_student;

DELIMITER $$

CREATE PROCEDURE sp_enroll_student
(
IN p_student INT,
IN p_course INT,
IN p_date DATE
)

BEGIN

IF EXISTS
(
SELECT *

FROM enrollments

WHERE student_id=p_student

AND course_id=p_course
)

THEN

SIGNAL SQLSTATE '45000'

SET MESSAGE_TEXT='Student already enrolled';

ELSE

INSERT INTO enrollments

(student_id,course_id,enrollment_date)

VALUES

(p_student,p_course,p_date);

END IF;

END$$

DELIMITER ;

--------------------------------------------------------

CALL sp_enroll_student(2,2,'2024-01-01');







-- =====================================================
-- TRANSFER LOG TABLE
-- =====================================================

DROP TABLE IF EXISTS department_transfer_log;

CREATE TABLE department_transfer_log

(

log_id INT AUTO_INCREMENT PRIMARY KEY,

student_id INT,

old_department INT,

new_department INT,

transfer_date DATETIME

);







-- =====================================================
-- TRANSFER PROCEDURE
-- =====================================================

DROP PROCEDURE IF EXISTS sp_transfer_student;

DELIMITER $$

CREATE PROCEDURE sp_transfer_student
(
IN sid INT,
IN newdept INT
)

BEGIN

DECLARE olddept INT;

DECLARE EXIT HANDLER FOR SQLEXCEPTION

BEGIN

ROLLBACK;

END;

START TRANSACTION;

SELECT department_id

INTO olddept

FROM students

WHERE student_id=sid;

UPDATE students

SET department_id=newdept

WHERE student_id=sid;

INSERT INTO department_transfer_log

(student_id,old_department,new_department,transfer_date)

VALUES

(sid,olddept,newdept,NOW());

COMMIT;

END$$

DELIMITER ;

--------------------------------------------------------

CALL sp_transfer_student(1,2);


-- Step 46:
-- Transaction rollback verified by attempting an invalid department_id.
-- The transaction was rolled back, so the student's department
-- was not changed and no log entry was inserted.




-- =====================================================
-- SAVEPOINT
-- =====================================================

START TRANSACTION;

INSERT INTO enrollments

(student_id,course_id,enrollment_date)

VALUES

(3,2,'2024-01-01');

SAVEPOINT first_insert;

INSERT INTO enrollments

(student_id,course_id,enrollment_date)

VALUES

(999,1,'2024-01-01');

ROLLBACK TO first_insert;

COMMIT;

--------------------------------------------------------

SELECT *

FROM enrollments;