import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../store/hooks';
import { selectEnrolledCourses } from '../store/selectors';

type HeaderProps = {
  siteName: string;
};

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/profile', label: 'Profile' },
];

export function Header({ siteName }: HeaderProps) {
  const enrolledCourses = useAppSelector(selectEnrolledCourses);

  return (
    <header className="site-header">
      <div>
        <p className="eyebrow">Digital Nurture 5.0</p>
        <h1 className="site-title">{siteName}</h1>
      </div>

      <nav className="site-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="header-badge" aria-label={`${enrolledCourses.length} enrolled courses`}>
        <span className="badge-label">Enrolled</span>
        <strong>{enrolledCourses.length}</strong>
      </div>
    </header>
  );
}