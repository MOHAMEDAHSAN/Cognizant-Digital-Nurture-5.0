import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CourseCard } from '../components/CourseCard';
import { LoadingState } from '../components/LoadingState';
import { loadCourses } from '../store/coursesSlice';
import { enroll } from '../store/enrollmentSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectCourses, selectCoursesError, selectCoursesStatus } from '../store/selectors';

export function CoursesPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const courses = useAppSelector(selectCourses);
  const status = useAppSelector(selectCoursesStatus);
  const error = useAppSelector(selectCoursesError);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDescending, setSortDescending] = useState(true);

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(loadCourses());
    }
  }, [status, dispatch]);

  const filteredCourses = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    const filtered = courses.filter((course) =>
      [course.name, course.code, course.instructor, course.category].some((value) =>
        value.toLowerCase().includes(normalized),
      ),
    );

    return [...filtered].sort((left, right) =>
      sortDescending ? right.credits - left.credits : left.credits - right.credits,
    );
  }, [courses, searchTerm, sortDescending]);

  return (
    <section className="page-stack">
      <div className="section-heading">
        <p className="eyebrow">Hands-on 3, 4, 5, 6</p>
        <h2>Course browser</h2>
      </div>

      <div className="toolbar">
        <label className="field" htmlFor="search-courses">
          Search courses
          <input
            id="search-courses"
            type="search"
            placeholder="Search by name, code, or instructor"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <button type="button" onClick={() => setSortDescending((current) => !current)}>
          Sort by credits {sortDescending ? 'high → low' : 'low → high'}
        </button>
      </div>

      <p className="results-count" role="status" aria-live="polite">
        {filteredCourses.length} course{filteredCourses.length === 1 ? '' : 's'} found
      </p>

      {status === 'idle' || status === 'loading' ? <LoadingState label="Loading course catalog..." /> : null}
      {status === 'failed' ? <div className="error-state">{error ?? 'Could not load courses.'}</div> : null}

      <div className="course-grid">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onSelect={(courseId) => navigate(`/courses/${courseId}`)}
            onEnroll={(selectedCourse) => {
              dispatch(enroll(selectedCourse));
              navigate('/profile');
            }}
          />
        ))}
      </div>
    </section>
  );
}