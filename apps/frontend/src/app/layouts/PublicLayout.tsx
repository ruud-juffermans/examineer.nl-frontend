import { Outlet } from 'react-router-dom';
import styles from './PublicLayout.module.css';

export function PublicLayout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <a href="/" className={styles.logo}>
          Examineer
        </a>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Examineer</p>
      </footer>
    </div>
  );
}
