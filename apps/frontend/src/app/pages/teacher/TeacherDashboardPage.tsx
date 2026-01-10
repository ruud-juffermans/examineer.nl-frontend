import { Link } from 'react-router-dom';
import styles from './TeacherDashboardPage.module.css';

export function TeacherDashboardPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Teacher Dashboard</h1>
          <p className={styles.subtitle}>Welcome back! Here&apos;s an overview of your exams.</p>
        </div>
        <Link to="/teacher/exams/create" className={styles.createButton}>
          <span className="material-icons-outlined">add</span>
          Create Exam
        </Link>
      </header>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className="material-icons-outlined">quiz</span>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>0</span>
            <span className={styles.statLabel}>Total Exams</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className="material-icons-outlined">publish</span>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>0</span>
            <span className={styles.statLabel}>Published</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className="material-icons-outlined">people</span>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>0</span>
            <span className={styles.statLabel}>Students</span>
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Exams</h2>
          <Link to="/teacher/exams" className={styles.viewAllLink}>
            View All
            <span className="material-icons-outlined">arrow_forward</span>
          </Link>
        </div>
        <div className={styles.emptyState}>
          <span className="material-icons-outlined">folder_open</span>
          <p>No exams yet. Create your first exam to get started.</p>
          <Link to="/teacher/exams/create" className={styles.emptyStateButton}>
            <span className="material-icons-outlined">add</span>
            Create Exam
          </Link>
        </div>
      </section>
    </div>
  );
}
