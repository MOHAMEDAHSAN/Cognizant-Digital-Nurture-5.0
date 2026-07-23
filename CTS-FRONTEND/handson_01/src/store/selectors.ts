import type { RootState } from './store';

export const selectCourses = (state: RootState) => state.courses.items;
export const selectCoursesStatus = (state: RootState) => state.courses.status;
export const selectCoursesError = (state: RootState) => state.courses.error;
export const selectEnrolledCourses = (state: RootState) => state.enrollment.enrolledCourses;
export const selectCourseById = (state: RootState, courseId: number) =>
  state.courses.items.find((course) => course.id === courseId);