import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchCourses } from '../api/courseApi';
import type { Course } from '../data/courses';

export const loadCourses = createAsyncThunk('courses/loadCourses', async () => fetchCourses());

type CoursesState = {
  items: Course[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: CoursesState = {
  items: [],
  status: 'idle',
  error: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadCourses.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unable to load courses.';
      });
  },
});

export default coursesSlice.reducer;