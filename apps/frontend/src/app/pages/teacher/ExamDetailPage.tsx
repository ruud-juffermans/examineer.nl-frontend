import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { examService, questionService, Exam, Question } from '@/services';
import { QuestionList } from './components/QuestionList';
import { QuestionForm } from './components/QuestionForm';
import styles from './ExamDetailPage.module.css';

export function ExamDetailPage() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const [exam, setExam] = useState<Exam | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUnpublishing, setIsUnpublishing] = useState(false);

  const loadExamData = useCallback(async () => {
    if (!examId) return;

    try {
      const [examData, questionsData] = await Promise.all([
        examService.getById(Number(examId)),
        questionService.getByExamId(Number(examId)),
      ]);
      setExam(examData);
      setQuestions(questionsData.sort((a, b) => a.position - b.position));
    } catch {
      setError('Failed to load exam');
    } finally {
      setIsLoading(false);
    }
  }, [examId]);

  useEffect(() => {
    loadExamData();
  }, [loadExamData]);

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setShowQuestionForm(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setShowQuestionForm(true);
  };

  const handleQuestionSaved = async () => {
    setShowQuestionForm(false);
    setEditingQuestion(null);
    await loadExamData();
  };

  const handleDeleteQuestion = async (questionId: number) => {
    if (!confirm('Are you sure you want to delete this question?')) return;

    try {
      await questionService.delete(questionId);
      setQuestions(questions.filter((q) => q.id !== questionId));
    } catch {
      setError('Failed to delete question');
    }
  };

  const handleReorderQuestions = async (reorderedQuestions: Question[]) => {
    if (!examId) return;

    const previousQuestions = [...questions];
    setQuestions(reorderedQuestions);

    try {
      await questionService.reorder(Number(examId), {
        questionIds: reorderedQuestions.map((q) => q.id),
      });
    } catch {
      setQuestions(previousQuestions);
      setError('Failed to reorder questions');
    }
  };

  const handlePublish = async () => {
    if (!exam || !examId) return;

    if (questions.length === 0) {
      setError('Cannot publish an exam without questions');
      return;
    }

    if (!confirm('Are you sure you want to publish this exam? Once published, questions cannot be edited.')) {
      return;
    }

    setIsPublishing(true);
    try {
      await examService.publish(Number(examId));
      setExam({ ...exam, status: 'published' });
    } catch {
      setError('Failed to publish exam');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleUnpublish = async () => {
    if (!exam || !examId) return;

    if (!confirm('Are you sure you want to revert this exam to draft? Students will no longer be able to take it.')) {
      return;
    }

    setIsUnpublishing(true);
    try {
      await examService.unpublish(Number(examId));
      setExam({ ...exam, status: 'draft' });
    } catch {
      setError('Failed to revert exam to draft');
    } finally {
      setIsUnpublishing(false);
    }
  };

  const handleDeleteExam = async () => {
    if (!examId) return;

    if (!confirm('Are you sure you want to delete this exam? This action cannot be undone.')) {
      return;
    }

    try {
      await examService.delete(Number(examId));
      navigate('/teacher/exams');
    } catch {
      setError('Failed to delete exam');
    }
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  const isDraft = exam?.status === 'draft';

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <span className="material-icons-outlined">hourglass_empty</span>
          <p>Loading exam...</p>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Exam not found</div>
        <Link to="/teacher/exams" className={styles.backLink}>
          <span className="material-icons-outlined">arrow_back</span>
          Back to Exams
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/teacher/exams" className={styles.backLink}>
          <span className="material-icons-outlined">arrow_back</span>
          Back to Exams
        </Link>

        <div className={styles.examInfo}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{exam.title}</h1>
            <span className={`${styles.statusBadge} ${styles[`status${exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}`]}`}>
              {exam.status}
            </span>
          </div>
          {exam.description && <p className={styles.description}>{exam.description}</p>}
        </div>

        <div className={styles.actions}>
          {isDraft ? (
            <>
              <button
                onClick={handlePublish}
                className={styles.publishButton}
                disabled={isPublishing || questions.length === 0}
              >
                <span className="material-icons-outlined">publish</span>
                {isPublishing ? 'Publishing...' : 'Publish'}
              </button>
              <button onClick={handleDeleteExam} className={styles.deleteButton}>
                <span className="material-icons-outlined">delete</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleUnpublish}
              className={styles.unpublishButton}
              disabled={isUnpublishing}
            >
              <span className="material-icons-outlined">unpublished</span>
              {isUnpublishing ? 'Reverting...' : 'Revert to Draft'}
            </button>
          )}
        </div>
      </header>

      {error && (
        <div className={styles.errorMessage}>
          {error}
          <button onClick={() => setError('')} className={styles.dismissError}>
            <span className="material-icons-outlined">close</span>
          </button>
        </div>
      )}

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className="material-icons-outlined">help_outline</span>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{questions.length}</span>
            <span className={styles.statLabel}>Questions</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className="material-icons-outlined">star_outline</span>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{totalPoints}</span>
            <span className={styles.statLabel}>Total Points</span>
          </div>
        </div>
      </div>

      <section className={styles.questionsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Questions</h2>
          {isDraft && (
            <button onClick={handleAddQuestion} className={styles.addButton}>
              <span className="material-icons-outlined">add</span>
              Add Question
            </button>
          )}
        </div>

        {questions.length === 0 ? (
          <div className={styles.emptyState}>
            <span className="material-icons-outlined">quiz</span>
            <h3>No questions yet</h3>
            <p>Add multiple-choice questions to your exam.</p>
            {isDraft && (
              <button onClick={handleAddQuestion} className={styles.emptyStateButton}>
                <span className="material-icons-outlined">add</span>
                Add Your First Question
              </button>
            )}
          </div>
        ) : (
          <QuestionList
            questions={questions}
            onEdit={isDraft ? handleEditQuestion : undefined}
            onDelete={isDraft ? handleDeleteQuestion : undefined}
            onReorder={isDraft ? handleReorderQuestions : undefined}
            readOnly={!isDraft}
          />
        )}
      </section>

      {showQuestionForm && examId && (
        <QuestionForm
          examId={Number(examId)}
          question={editingQuestion}
          onSave={handleQuestionSaved}
          onCancel={() => {
            setShowQuestionForm(false);
            setEditingQuestion(null);
          }}
        />
      )}
    </div>
  );
}
