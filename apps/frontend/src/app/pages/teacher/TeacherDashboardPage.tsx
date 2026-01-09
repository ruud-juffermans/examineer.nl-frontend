import styles from './TeacherDashboardPage.module.css';

export function TeacherDashboardPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Teacher Dashboard</h1>
        <p className={styles.subtitle}>Welcome back! Here&apos;s an overview of your exams.</p>
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
        <h2 className={styles.sectionTitle}>Recent Exams</h2>
        <div className={styles.emptyState}>
          <span className="material-icons-outlined">folder_open</span>
          <p>No exams yet. Create your first exam to get started.</p>
        </div>
      </section>
    </div>
  );
}
