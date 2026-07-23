"""
Task 3 Comparison

Before joinedload()

1 Query to fetch enrollments
N Queries to fetch students
N Queries to fetch courses

Total = N+1 Queries

After joinedload()

Only one JOIN query executed.

Performance is significantly improved.
"""


"""
Step 87

With echo=True enabled, SQLAlchemy executed multiple SELECT
statements while accessing related student and course objects.
This demonstrates the N+1 Query Problem.
"""

"""
Bonus

Equivalent Django ORM:

Enrollment.objects.select_related(
    "student",
    "course"
).all()
"""

from sqlalchemy.orm import sessionmaker
from models import (
    engine,
    Department,
    Student,
    Course,
    Enrollment
)
from datetime import date
from sqlalchemy.orm import joinedload

Session = sessionmaker(bind=engine)
session = Session()

dept1 = Department(
    dept_name="Computer Science",
    head_of_dept="Dr. Ramesh Kumar",
    budget=850000
)

dept2 = Department(
    dept_name="Electronics",
    head_of_dept="Dr. Priya Nair",
    budget=620000
)

dept3 = Department(
    dept_name="Mechanical",
    head_of_dept="Dr. Suresh Iyer",
    budget=540000
)


student1 = Student(
    first_name="Arjun",
    last_name="Mehta",
    email="arjun.mehta@college.edu",
    date_of_birth=date(2003, 4, 12),
    department=dept1,
    enrollment_year=2022
)

student2 = Student(
    first_name="Priya",
    last_name="Suresh",
    email="priya.suresh@college.edu",
    date_of_birth=date(2003, 7, 25),
    department=dept1,
    enrollment_year=2022
)

student3 = Student(
    first_name="Rohan",
    last_name="Verma",
    email="rohan.verma@college.edu",
    date_of_birth=date(2002, 11, 8),
    department=dept2,
    enrollment_year=2021
)

student4 = Student(
    first_name="Sneha",
    last_name="Patel",
    email="sneha.patel@college.edu",
    date_of_birth=date(2004, 1, 30),
    department=dept3,
    enrollment_year=2023
)

student5 = Student(
    first_name="Vikram",
    last_name="Das",
    email="vikram.das@college.edu",
    date_of_birth=date(2003, 9, 14),
    department=dept1,
    enrollment_year=2022
)


session.add_all([dept1, dept2, dept3])
session.add_all([student1, student2, student3, student4, student5])

session.commit()

course1 = Course(
    course_name="Data Structures & Algorithms",
    course_code="CS101",
    credits=4,
    department=dept1
)

course2 = Course(
    course_name="Database Management Systems",
    course_code="CS102",
    credits=3,
    department=dept1
)

course3 = Course(
    course_name="Object Oriented Programming",
    course_code="CS103",
    credits=4,
    department=dept1
)

session.add_all([course1, course2, course3])
session.commit()

enrollment1 = Enrollment(
    student=student1,
    course=course1,
    enrollment_date=date(2022, 7, 1),
    grade="A"
)

enrollment2 = Enrollment(
    student=student2,
    course=course1,
    enrollment_date=date(2022, 7, 1),
    grade="B"
)

enrollment3 = Enrollment(
    student=student3,
    course=course2,
    enrollment_date=date(2021, 7, 1),
    grade="A"
)

enrollment4 = Enrollment(
    student=student5,
    course=course3,
    enrollment_date=date(2022, 7, 1),
    grade="B"
)

session.add_all([
    enrollment1,
    enrollment2,
    enrollment3,
    enrollment4
])

session.commit()

print("\nStudents in Computer Science Department:")

students = (
    session.query(Student)
    .join(Department)
    .filter(Department.dept_name == "Computer Science")
    .all()
)

for student in students:
    print(
        student.student_id,
        student.first_name,
        student.last_name,
        student.email,
        student.enrollment_year
    )

print("\nEnrollment Details:")

enrollments = (
    session.query(Enrollment)
    .options(
        joinedload(Enrollment.student),
        joinedload(Enrollment.course)
    )
    .all()
)

for enrollment in enrollments:
    print(
        enrollment.student.first_name,
        "->",
        enrollment.course.course_name,
        "| Grade:",
        enrollment.grade
    )

print("\nUpdating Student Enrollment Year...")

student = session.query(Student).filter(
    Student.email == "arjun.mehta@college.edu"
).first()

if student:
    student.enrollment_year = 2023
    session.commit()
    print("Student updated successfully!")


print("\nDeleting an Enrollment...")

enrollment = session.query(Enrollment).first()

if enrollment:
    session.delete(enrollment)
    session.commit()
    print("Enrollment deleted successfully!")



session.close()