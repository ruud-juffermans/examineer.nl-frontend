import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './PublicLayout.module.css';

export function PublicLayout() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className={styles.layout}>
      <header className={`${styles.header} ${isLandingPage ? styles.headerTransparent : ''}`}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            <span className="material-icons-outlined">quiz</span>
            Examineer
          </Link>
          <nav className={styles.nav}>
            <Link to="/login" className={styles.navLink}>
              Sign In
            </Link>
            <Link to="/register" className={styles.navButtonPrimary}>
              Get Started
            </Link>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <Link to="/" className={styles.footerLogo}>
              <span className="material-icons-outlined">quiz</span>
              Examineer
            </Link>
            <p>The modern exam preparation platform for teachers and students.</p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerLinkGroup}>
              <h4>Product</h4>
              <Link to="/">Features</Link>
              <Link to="/">For Teachers</Link>
              <Link to="/">For Students</Link>
            </div>
            <div className={styles.footerLinkGroup}>
              <h4>Account</h4>
              <Link to="/login">Sign In</Link>
              <Link to="/register">Create Account</Link>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Examineer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
