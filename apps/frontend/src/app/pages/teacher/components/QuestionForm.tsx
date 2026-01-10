import { useState, FormEvent } from 'react';
import { questionService, Question, CreateQuestionOptionData } from '@/services';
import styles from './QuestionForm.module.css';

interface QuestionFormProps {
  examId: number;
  question: Question | null;
  onSave: () => void;
  onCancel: () => void;
}

interface OptionFormData {
  id: string;
  label: string;
  isCorrect: boolean;
}

export function QuestionForm({ examId, question, onSave, onCancel }: QuestionFormProps) {
  const [prompt, setPrompt] = useState(question?.prompt || '');
  const [points, setPoints] = useState(question?.points.toString() || '1');
  const [options, setOptions] = useState<OptionFormData[]>(() => {
    if (question?.options && question.options.length > 0) {
      return question.options.map((opt) => ({
        id: crypto.randomUUID(),
        label: opt.label,
        isCorrect: opt.isCorrect,
      }));
    }
    return [
      { id: crypto.randomUUID(), label: '', isCorrect: false },
      { id: crypto.randomUUID(), label: '', isCorrect: false },
    ];
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!question;

  const handleAddOption = () => {
    if (options.length >= 6) return;
    setOptions([...options, { id: crypto.randomUUID(), label: '', isCorrect: false }]);
  };

  const handleRemoveOption = (id: string) => {
    if (options.length <= 2) return;
    setOptions(options.filter((opt) => opt.id !== id));
  };

  const handleOptionChange = (id: string, label: string) => {
    setOptions(options.map((opt) => (opt.id === id ? { ...opt, label } : opt)));
  };

  const handleCorrectChange = (id: string) => {
    setOptions(options.map((opt) => ({ ...opt, isCorrect: opt.id === id })));
  };

  const validateForm = (): boolean => {
    if (!prompt.trim()) {
      setError('Question prompt is required');
      return false;
    }

    const pointsNum = parseFloat(points);
    if (isNaN(pointsNum) || pointsNum <= 0) {
      setError('Points must be a positive number');
      return false;
    }

    const filledOptions = options.filter((opt) => opt.label.trim());
    if (filledOptions.length < 2) {
      setError('At least 2 answer options are required');
      return false;
    }

    const hasCorrect = options.some((opt) => opt.isCorrect && opt.label.trim());
    if (!hasCorrect) {
      setError('Please mark one option as the correct answer');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    const optionsData: CreateQuestionOptionData[] = options
      .filter((opt) => opt.label.trim())
      .map((opt) => ({
        label: opt.label.trim(),
        isCorrect: opt.isCorrect,
      }));

    try {
      if (isEditing && question) {
        await questionService.update(question.id, {
          prompt: prompt.trim(),
          points: parseFloat(points),
          options: optionsData,
        });
      } else {
        await questionService.create(examId, {
          prompt: prompt.trim(),
          points: parseFloat(points),
          options: optionsData,
        });
      }
      onSave();
    } catch {
      setError(isEditing ? 'Failed to update question' : 'Failed to create question');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{isEditing ? 'Edit Question' : 'Add Question'}</h2>
          <button onClick={onCancel} className={styles.closeButton}>
            <span className="material-icons-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.field}>
            <label htmlFor="prompt" className={styles.label}>
              Question <span className={styles.required}>*</span>
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className={styles.textarea}
              placeholder="Enter your question..."
              rows={3}
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="points" className={styles.label}>
              Points <span className={styles.required}>*</span>
            </label>
            <input
              id="points"
              type="number"
              min="0.5"
              step="0.5"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className={styles.pointsInput}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Answer Options <span className={styles.required}>*</span>
              <span className={styles.labelHint}>(Select the correct answer)</span>
            </label>
            <div className={styles.optionsList}>
              {options.map((option, index) => (
                <div key={option.id} className={styles.optionRow}>
                  <button
                    type="button"
                    onClick={() => handleCorrectChange(option.id)}
                    className={`${styles.correctButton} ${option.isCorrect ? styles.correctButtonActive : ''}`}
                    title={option.isCorrect ? 'Correct answer' : 'Mark as correct'}
                  >
                    <span className="material-icons-outlined">
                      {option.isCorrect ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                  </button>
                  <input
                    type="text"
                    value={option.label}
                    onChange={(e) => handleOptionChange(option.id, e.target.value)}
                    className={styles.optionInput}
                    placeholder={`Option ${index + 1}`}
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(option.id)}
                      className={styles.removeOptionButton}
                      title="Remove option"
                    >
                      <span className="material-icons-outlined">close</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
            {options.length < 6 && (
              <button type="button" onClick={handleAddOption} className={styles.addOptionButton}>
                <span className="material-icons-outlined">add</span>
                Add Option
              </button>
            )}
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onCancel} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? (
                'Saving...'
              ) : isEditing ? (
                <>
                  <span className="material-icons-outlined">check</span>
                  Save Changes
                </>
              ) : (
                <>
                  <span className="material-icons-outlined">add</span>
                  Add Question
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
