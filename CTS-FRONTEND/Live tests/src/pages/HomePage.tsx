import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { fetchNotifications } from '../api/courseApi';
import { CourseCard } from '../components/CourseCard';
import { LoadingState } from '../components/LoadingState';
import { NotificationFeed } from '../components/NotificationFeed';
import { portalStats } from '../data/courses';
import { enroll } from '../store/enrollmentSlice';
import { loadCourses } from '../store/coursesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectCourses, selectCoursesStatus } from '../store/selectors';

export function HomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const courses = useAppSelector(selectCourses);
  const courseStatus = useAppSelector(selectCoursesStatus);
  const [notifications, setNotifications] = useState<{ id: number; title: string; message: string }[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);

  useEffect(() => {
    if (courseStatus === 'idle') {
      void dispatch(loadCourses());
    }
  }, [courseStatus, dispatch]);

  useEffect(() => {
    let isMounted = true;

    void (async () => {
      setNotificationsLoading(true);
      const payload = await fetchNotifications();
      if (isMounted) {
        setNotifications(payload);
        setNotificationsLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Student Portal</p>
          <h2>One clear frontend project, built in the same sequence as the guide.</h2>
          <p>
            This portal centralises the core frontend exercises into a single polished React app: layout,
            responsive cards, async loading, routing, course browsing, and enrollment state.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/courses">Browse courses</Link>
            <Link className="button secondary" to="/profile">Open profile</Link>
          </div>
        </div>

        <div className="stats-grid" aria-label="Portal summary statistics">
          {portalStats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>
      </section>

      {courseStatus === 'loading' ? <LoadingState label="Loading courses..." /> : null}

      <section className="section-card" aria-labelledby="featured-courses-title">
        <div className="section-heading">
          <p className="eyebrow">Hands-on 2 to 6</p>
          <h2 id="featured-courses-title">Featured courses</h2>
        </div>

        <div className="course-grid compact-grid">
          {courses.slice(0, 3).map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelect={(courseId) => navigate(`/courses/${courseId}`)}
              onEnroll={(selectedCourse) => dispatch(enroll(selectedCourse))}
              actionLabel="Details"
            />
          ))}
        </div>
      </section>

      {notificationsLoading ? <LoadingState label="Loading notifications..." /> : <NotificationFeed notifications={notifications} />}
    </div>
  );
}