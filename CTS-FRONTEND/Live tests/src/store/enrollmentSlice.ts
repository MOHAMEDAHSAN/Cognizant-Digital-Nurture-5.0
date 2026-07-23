import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Course } from '../data/courses';

type EnrollmentState = {
  enrolledCourses: Course[];
};

const initialState: EnrollmentState = {
  enrolledCourses: [],
};

const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    enroll(state, action: PayloadAction<Course>) {
      if (!state.enrolledCourses.some((course) => course.id === action.payload.id)) {
        state.enrolledCourses.push(action.payload);
      }
    },
    unenroll(state, action: PayloadAction<number>) {
      state.enrolledCourses = state.enrolledCourses.filter((course) => course.id !== action.payload);
    },
    resetEnrollments(state) {
      state.enrolledCourses = [];
    },
  },
});

export const { enroll, unenroll, resetEnrollments } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;