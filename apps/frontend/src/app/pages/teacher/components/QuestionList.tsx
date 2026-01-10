import { useState, DragEvent } from 'react';
import { Question } from '@/services';
import styles from './QuestionList.module.css';

interface QuestionListProps {
  questions: Question[];
  onEdit?: (question: Question) => void;
  onDelete?: (questionId: number) => void;
  onReorder?: (questions: Question[]) => void;
  readOnly?: boolean;
}

export function QuestionList({
  questions,
  onEdit,
  onDelete,
  onReorder,
  readOnly = false,
}: QuestionListProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex || !onReorder) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newQuestions = [...questions];
    const draggedItem = newQuestions[draggedIndex];
    if (!draggedItem) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    newQuestions.splice(draggedIndex, 1);
    newQuestions.splice(dropIndex, 0, draggedItem);

    // Update positions
    const reorderedQuestions = newQuestions.map((q, index) => ({
      ...q,
      position: index + 1,
    }));

    onReorder(reorderedQuestions);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const getCorrectOption = (question: Question) => {
    return question.options.find((opt) => opt.isCorrect);
  };

  return (
    <div className={styles.list}>
      {questions.map((question, index) => (
        <div
          key={question.id}
          className={`${styles.questionCard} ${draggedIndex === index ? styles.dragging : ''} ${dragOverIndex === index ? styles.dragOver : ''}`}
          draggable={!readOnly && !!onReorder}
          onDragStart={(e) => !readOnly && handleDragStart(e, index)}
          onDragOver={(e) => !readOnly && handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => !readOnly && handleDrop(e, index)}
          onDragEnd={handleDragEnd}
        >
          {!readOnly && onReorder && (
            <div className={styles.dragHandle}>
              <span className="material-icons-outlined">drag_indicator</span>
            </div>
          )}

          <div className={styles.questionNumber}>{index + 1}</div>

          <div className={styles.questionContent}>
            <div className={styles.questionPrompt}>{question.prompt}</div>

            <div className={styles.optionsList}>
              {question.options
                .sort((a, b) => a.position - b.position)
                .map((option) => (
                  <div
                    key={option.id}
                    className={`${styles.option} ${option.isCorrect ? styles.correctOption : ''}`}
                  >
                    <span className="material-icons-outlined">
                      {option.isCorrect ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span>{option.label}</span>
                  </div>
                ))}
            </div>

            <div className={styles.questionMeta}>
              <span className={styles.metaItem}>
                <span className="material-icons-outlined">star_outline</span>
                {question.points} point{question.points !== 1 ? 's' : ''}
              </span>
              <span className={styles.metaItem}>
                <span className="material-icons-outlined">check</span>
                Answer: {getCorrectOption(question)?.label || 'Not set'}
              </span>
            </div>
          </div>

          {!readOnly && (onEdit || onDelete) && (
            <div className={styles.questionActions}>
              {onEdit && (
                <button
                  onClick={() => onEdit(question)}
                  className={styles.actionButton}
                  title="Edit question"
                >
                  <span className="material-icons-outlined">edit</span>
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(question.id)}
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  title="Delete question"
                >
                  <span className="material-icons-outlined">delete</span>
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
