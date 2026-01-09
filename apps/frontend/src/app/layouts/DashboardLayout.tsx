import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  role: 'teacher' | 'student';
}

const teacherNavItems = [
  { to: '/teacher', label: 'Dashboard', icon: 'dashboard' },
  { to: '/teacher/exams', label: 'Exams', icon: 'quiz' },
  { to: '/teacher/students', label: 'Students', icon: 'people' },
];

const studentNavItems = [
  { to: '/student', label: 'Dashboard', icon: 'dashboard' },
  { to: '/student/exams', label: 'My Exams', icon: 'quiz' },
];

export function DashboardLayout({ role }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navItems = role === 'teacher' ? teacherNavItems : studentNavItems;

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Examineer</div>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === `/${role}`}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
              }
            >
              <span className="material-icons-outlined">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.displayName}</span>
            <span className={styles.userRole}>{user?.role}</span>
          </div>
          <button onClick={logout} className={styles.logoutButton}>
            <span className="material-icons-outlined">logout</span>
          </button>
        </div>
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
