import type { Course } from '../data/courses';

type CourseCardProps = {
  course: Course;
  onSelect?: (courseId: number) => void;
  onEnroll?: (course: Course) => void;
  actionLabel?: string;
};

export function CourseCard({ course, onSelect, onEnroll, actionLabel = 'View details' }: CourseCardProps) {
  const openCourse = () => onSelect?.(course.id);

  return (
    <article
      className="course-card"
      role="button"
      tabIndex={0}
      aria-label={`${course.name}, ${course.code}, ${course.credits} credits`}
      onClick={openCourse}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openCourse();
        }
      }}
    >
      <div className="course-card__topline">
        <span>{course.code}</span>
        <span>{course.category}</span>
      </div>

      <h3>{course.name}</h3>
      <p>{course.description}</p>

      <dl className="course-metadata">
        <div>
          <dt>Credits</dt>
          <dd>{course.credits}</dd>
        </div>
        <div>
          <dt>Grade</dt>
          <dd>{course.grade}</dd>
        </div>
        <div>
          <dt>Instructor</dt>
          <dd>{course.instructor}</dd>
        </div>
      </dl>

      <div className="course-card__actions">
        <span className="course-schedule">{course.schedule}</span>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onSelect?.(course.id);
          }}
        >
          {actionLabel}
        </button>
        {onEnroll ? (
          <button
            type="button"
            className="secondary"
            onClick={(event) => {
              event.stopPropagation();
              onEnroll(course);
            }}
          >
            Enroll
          </button>
        ) : null}
      </div>
    </article>
  );
}