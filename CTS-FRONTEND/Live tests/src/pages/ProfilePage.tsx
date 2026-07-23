import { useMemo, useState } from 'react';

import { resetEnrollments, unenroll } from '../store/enrollmentSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectEnrolledCourses } from '../store/selectors';

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const enrolledCourses = useAppSelector(selectEnrolledCourses);
  const [profile, setProfile] = useState({
    name: 'Ananya Sharma',
    email: 'ananya.sharma@college.edu',
    semester: '6',
  });

  const totalCredits = useMemo(
    () => enrolledCourses.reduce((sum, course) => sum + course.credits, 0),
    [enrolledCourses],
  );

  return (
    <section className="page-stack">
      <div className="section-heading">
        <p className="eyebrow">Hands-on 5, 6, 10</p>
        <h2>Student profile</h2>
      </div>

      <div className="profile-layout">
        <form
          className="section-card profile-form"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label className="field" htmlFor="student-name">
            Name
            <input
              id="student-name"
              value={profile.name}
              onChange={(event) => setProfile({ ...profile, name: event.target.value })}
            />
          </label>

          <label className="field" htmlFor="student-email">
            Email
            <input
              id="student-email"
              type="email"
              value={profile.email}
              onChange={(event) => setProfile({ ...profile, email: event.target.value })}
            />
          </label>

          <label className="field" htmlFor="student-semester">
            Semester
            <input
              id="student-semester"
              value={profile.semester}
              onChange={(event) => setProfile({ ...profile, semester: event.target.value })}
            />
          </label>

          <div className="hero-actions">
            <button type="submit">Save profile</button>
            <button type="button" className="secondary" onClick={() => dispatch(resetEnrollments())}>
              Clear enrollments
            </button>
          </div>
        </form>

        <aside className="section-card">
          <div className="section-heading">
            <p className="eyebrow">Context + Redux state</p>
            <h3>Enrolled courses</h3>
          </div>

          <div className="summary-pill-row">
            <span className="summary-pill">Courses: {enrolledCourses.length}</span>
            <span className="summary-pill">Credits: {totalCredits}</span>
          </div>

          <div className="enrollment-list">
            {enrolledCourses.length === 0 ? (
              <p className="muted-copy">No courses enrolled yet. Open the course browser and add one.</p>
            ) : (
              enrolledCourses.map((course) => (
                <article key={course.id} className="enrollment-row">
                  <div>
                    <strong>{course.name}</strong>
                    <p>
                      {course.code} · {course.credits} credits
                    </p>
                  </div>
                  <button type="button" className="secondary" onClick={() => dispatch(unenroll(course.id))}>
                    Remove
                  </button>
                </article>
              ))
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}