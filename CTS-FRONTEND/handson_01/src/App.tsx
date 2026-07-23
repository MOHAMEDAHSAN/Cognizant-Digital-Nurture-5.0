import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { loadCourses } from './store/coursesSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectCoursesStatus } from './store/selectors';

export default function App() {
  const dispatch = useAppDispatch();
  const coursesStatus = useAppSelector(selectCoursesStatus);

  useEffect(() => {
    if (coursesStatus === 'idle') {
      void dispatch(loadCourses());
    }
  }, [coursesStatus, dispatch]);

  return (
    <div className="app-shell">
      <Header siteName="Student Portal" />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}