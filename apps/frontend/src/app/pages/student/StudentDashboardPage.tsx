import styles from './StudentDashboardPage.module.css';

export function StudentDashboardPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Student Dashboard</h1>
        <p className={styles.subtitle}>Your assigned exams and progress</p>
      </header>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className="material-icons-outlined">assignment</span>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>0</span>
            <span className={styles.statLabel}>Assigned Exams</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className="material-icons-outlined">check_circle</span>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>0</span>
            <span className={styles.statLabel}>Completed</span>
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Pending Exams</h2>
        <div className={styles.emptyState}>
          <span className="material-icons-outlined">inbox</span>
          <p>No exams assigned yet. Check back later!</p>
        </div>
      </section>
    </div>
  );
}
