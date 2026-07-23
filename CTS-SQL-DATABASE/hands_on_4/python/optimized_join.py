import time

import mysql.connector


connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="vishal1234",
    database="college_db",
)
cursor = connection.cursor()

start = time.time()

cursor.execute(
    """
    SELECT
        e.enrollment_id,
        s.first_name,
        s.last_name,
        c.course_name
    FROM enrollments e
    JOIN students s ON s.student_id = e.student_id
    JOIN courses c ON c.course_id = e.course_id
    """
)
rows = cursor.fetchall()

end = time.time()

print("----- Optimized Version -----")
print("Queries Executed: 1")
print("Execution Time:", end - start)

for row in rows:
    print(row)

cursor.close()
connection.close()

# Step 59:
# The N+1 query problem occurs when one query retrieves
# N records and then N additional queries are executed
# to fetch related data.
#
# In this example:
# N+1 Version = 13 queries
# Optimized JOIN Version = 1 query
#
# In a real application with 10,000 enrollments,
# the N+1 approach would execute 10,001 queries,
# causing significant performance issues.
#
# The JOIN approach retrieves the same data
# using only a single query.