import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { LoadingState } from '../components/LoadingState';
import { loadCourses } from '../store/coursesSlice';
import { enroll } from '../store/enrollmentSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectCourseById, selectCoursesStatus } from '../store/selectors';

export function CourseDetailPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const courseId = Number(params.courseId);
  const course = useAppSelector((state) => selectCourseById(state, courseId));
  const status = useAppSelector(selectCoursesStatus);

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(loadCourses());
    }
  }, [status, dispatch]);

  if (status === 'idle' || status === 'loading') {
    return <LoadingState label="Loading course details..." />;
  }

  if (!course) {
    return <div className="error-state">Course not found. Please return to the course browser.</div>;
  }

  return (
    <section className="section-card course-detail">
      <div>
        <p className="eyebrow">Hands-on 6</p>
        <h2>{course.name}</h2>
        <p>{course.description}</p>
      </div>

      <dl className="course-detail-grid">
        <div>
          <dt>Code</dt>
          <dd>{course.code}</dd>
        </div>
        <div>
          <dt>Credits</dt>
          <dd>{course.credits}</dd>
        </div>
        <div>
          <dt>Instructor</dt>
          <dd>{course.instructor}</dd>
        </div>
        <div>
          <dt>Schedule</dt>
          <dd>{course.schedule}</dd>
        </div>
        <div>
          <dt>Grade</dt>
          <dd>{course.grade}</dd>
        </div>
      </dl>

      <div className="hero-actions">
        <button
          type="button"
          onClick={() => {
            dispatch(enroll(course));
            navigate('/profile');
          }}
        >
          Enroll now
        </button>
        <button type="button" className="secondary" onClick={() => navigate('/courses')}>
          Back to courses
        </button>
      </div>
    </section>
  );
}