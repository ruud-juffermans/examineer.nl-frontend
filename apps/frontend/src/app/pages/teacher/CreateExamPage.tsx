import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { examService } from '@/services';
import styles from './CreateExamPage.module.css';

export function CreateExamPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await examService.create({
        title: title.trim(),
        description: description.trim() || undefined,
      });
      navigate(`/teacher/exams/${result.id}`);
    } catch {
      setError('Failed to create exam. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/teacher/exams" className={styles.backLink}>
          <span className="material-icons-outlined">arrow_back</span>
          Back to Exams
        </Link>
        <h1 className={styles.title}>Create New Exam</h1>
        <p className={styles.subtitle}>
          Set up your exam with a title and description. You can add questions after creating it.
        </p>
      </header>

      <div className={styles.formCard}>
        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="title" className={styles.label}>
              Exam Title <span className={styles.required}>*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              placeholder="e.g., Biology Midterm Practice"
              required
              autoFocus
            />
            <span className={styles.hint}>
              Choose a clear, descriptive title for your exam
            </span>
          </div>

          <div className={styles.field}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              placeholder="Provide instructions or context for students..."
              rows={4}
            />
            <span className={styles.hint}>
              Optional. Add any instructions or notes for students
            </span>
          </div>

          <div className={styles.actions}>
            <Link to="/teacher/exams" className={styles.cancelButton}>
              Cancel
            </Link>
            <button type="submit" className={styles.submitButton} disabled={isLoading || !title.trim()}>
              {isLoading ? (
                <>Creating...</>
              ) : (
                <>
                  <span className="material-icons-outlined">add</span>
                  Create Exam
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className={styles.infoCard}>
        <span className="material-icons-outlined">info</span>
        <div>
          <h3>What happens next?</h3>
          <p>After creating the exam, you will be able to add multiple-choice questions. The exam starts as a draft and can be published when ready.</p>
        </div>
      </div>
    </div>
  );
}
