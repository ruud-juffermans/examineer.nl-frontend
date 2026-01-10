import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { examService, Exam } from '@/services';
import styles from './ExamListPage.module.css';

export function ExamListPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      const data = await examService.getAll();
      setExams(data);
    } catch {
      setError('Failed to load exams');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadgeClass = (status: Exam['status']) => {
    switch (status) {
      case 'published':
        return styles.statusPublished;
      case 'draft':
        return styles.statusDraft;
      case 'archived':
        return styles.statusArchived;
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <span className="material-icons-outlined">hourglass_empty</span>
          <p>Loading exams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Exams</h1>
          <p className={styles.subtitle}>Create and manage your practice exams</p>
        </div>
        <Link to="/teacher/exams/create" className={styles.createButton}>
          <span className="material-icons-outlined">add</span>
          Create Exam
        </Link>
      </header>

      {error && <div className={styles.error}>{error}</div>}

      {exams.length === 0 ? (
        <div className={styles.emptyState}>
          <span className="material-icons-outlined">quiz</span>
          <h2>No exams yet</h2>
          <p>Create your first exam to help students practice and prepare.</p>
          <Link to="/teacher/exams/create" className={styles.emptyStateButton}>
            <span className="material-icons-outlined">add</span>
            Create Your First Exam
          </Link>
        </div>
      ) : (
        <div className={styles.examList}>
          {exams.map((exam) => (
            <Link key={exam.id} to={`/teacher/exams/${exam.id}`} className={styles.examCard}>
              <div className={styles.examInfo}>
                <div className={styles.examHeader}>
                  <h3 className={styles.examTitle}>{exam.title}</h3>
                  <span className={`${styles.statusBadge} ${getStatusBadgeClass(exam.status)}`}>
                    {exam.status}
                  </span>
                </div>
                {exam.description && (
                  <p className={styles.examDescription}>{exam.description}</p>
                )}
                <div className={styles.examMeta}>
                  <span className={styles.metaItem}>
                    <span className="material-icons-outlined">calendar_today</span>
                    Created {formatDate(exam.createdAt)}
                  </span>
                </div>
              </div>
              <span className={`material-icons-outlined ${styles.examArrow}`}>chevron_right</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
