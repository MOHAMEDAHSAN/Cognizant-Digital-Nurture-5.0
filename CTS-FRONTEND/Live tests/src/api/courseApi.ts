import { courseCatalog } from '../data/courses';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchCourses() {
  await delay(850);
  return courseCatalog;
}

export async function fetchCourseById(courseId: number) {
  await delay(250);
  const course = courseCatalog.find((item) => item.id === courseId);

  if (!course) {
    throw new Error(`Course ${courseId} was not found.`);
  }

  return course;
}

export async function fetchNotifications() {
  await delay(700);

  return [
    {
      id: 1,
      title: 'Registration window opens today',
      message: 'Students can enroll in summer electives from the course browser.',
    },
    {
      id: 2,
      title: 'Profile verification reminder',
      message: 'Keep your student profile updated before the semester cutoff.',
    },
    {
      id: 3,
      title: 'New mentoring session',
      message: 'Course mentors will host a live Q&A at the end of the week.',
    },
  ];
}