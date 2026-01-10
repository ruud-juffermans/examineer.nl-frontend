import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { assignmentService, AvailableExam } from '../../../services';
import styles from './StudentDashboardPage.module.css';

interface DashboardStats {
  total: number;
  completed: number;
  pending: number;
}

export function StudentDashboardPage() {
  const [exams, setExams] = useState<AvailableExam[]>([]);
  const [stats, setStats] = useState<DashboardStats>({ total: 0, completed: 0, pending: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExams() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await assignmentService.getAvailableExams();
        setExams(response.exams);
        setStats(response.stats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load exams');
      } finally {
        setIsLoading(false);
      }
    }

    fetchExams();
  }, []);

  const pendingExams = exams.filter((e) => e.status === 'pending');
  const completedExams = exams.filter((e) => e.status === 'completed');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Student Dashboard</h1>
        <p className={styles.subtitle}>Available exams and your progress</p>
      </header>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className="material-icons-outlined">assignment</span>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{isLoading ? '-' : stats.total}</span>
            <span className={styles.statLabel}>Available Exams</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className="material-icons-outlined">check_circle</span>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{isLoading ? '-' : stats.completed}</span>
            <span className={styles.statLabel}>Completed</span>
          </div>
        </div>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <span className="material-icons-outlined">error_outline</span>
          <p>{error}</p>
        </div>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Available Exams</h2>
        {isLoading ? (
          <div className={styles.loadingState}>
            <span className="material-icons-outlined">hourglass_empty</span>
            <p>Loading exams...</p>
          </div>
        ) : pendingExams.length === 0 ? (
          <div className={styles.emptyState}>
            <span className="material-icons-outlined">inbox</span>
            <p>No exams available. Check back later!</p>
          </div>
        ) : (
          <div className={styles.examList}>
            {pendingExams.map((exam) => (
              <div key={exam.id} className={styles.examCard}>
                <div className={styles.examInfo}>
                  <h3 className={styles.examTitle}>{exam.title}</h3>
                  {exam.description && (
                    <p className={styles.examDescription}>{exam.description}</p>
                  )}
                  <span className={styles.examMeta}>
                    <span className="material-icons-outlined">event</span>
                    Published {formatDate(exam.publishedAt)}
                  </span>
                </div>
                <div className={styles.examActions}>
                  <Link
                    to={`/student/exams/${exam.examId}`}
                    className={styles.startButton}
                  >
                    <span className="material-icons-outlined">play_arrow</span>
                    Start Exam
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {completedExams.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Completed Exams</h2>
          <div className={styles.examList}>
            {completedExams.map((exam) => (
              <div key={exam.id} className={`${styles.examCard} ${styles.examCompleted}`}>
                <div className={styles.examInfo}>
                  <h3 className={styles.examTitle}>{exam.title}</h3>
                  {exam.description && (
                    <p className={styles.examDescription}>{exam.description}</p>
                  )}
                  <span className={styles.examMeta}>
                    <span className="material-icons-outlined">check_circle</span>
                    Completed {formatDate(exam.completedAt!)}
                  </span>
                </div>
                <div className={styles.examActions}>
                  <div className={styles.scoreDisplay}>
                    <span className={styles.scoreValue}>{exam.score}%</span>
                    <span className={styles.scoreLabel}>Score</span>
                  </div>
                  <Link
                    to={`/student/attempts/${exam.attemptId}/result`}
                    className={styles.viewResultButton}
                  >
                    <span className="material-icons-outlined">visibility</span>
                    View Result
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
