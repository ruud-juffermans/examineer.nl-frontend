import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

export function LandingPage() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Welcome to Examineer</h1>
        <p className={styles.subtitle}>
          The modern exam preparation platform for teachers and students
        </p>
        <div className={styles.actions}>
          <Link to="/register" className={styles.primaryButton}>
            Get Started
          </Link>
          <Link to="/login" className={styles.secondaryButton}>
            Sign In
          </Link>
        </div>
      </section>
    </div>
  );
}
