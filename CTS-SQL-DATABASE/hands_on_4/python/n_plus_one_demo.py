import time

import mysql.connector


connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="vishal1234",
    database="college_db",
)
cursor = connection.cursor()

query_count = 0
start = time.time()

cursor.execute("SELECT student_id, course_id FROM enrollments")
enrollments = cursor.fetchall()
query_count += 1

for enrollment in enrollments:
    student_id = enrollment[0]
    cursor.execute(
        "SELECT first_name, last_name FROM students WHERE student_id=%s",
        (student_id,),
    )
    cursor.fetchone()
    query_count += 1

end = time.time()

print("----- N+1 Version -----")
print("Queries Executed:", query_count)
print("Execution Time:", end - start)

cursor.close()
connection.close()