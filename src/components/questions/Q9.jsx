import QuestionShell from './QuestionShell';
import styles from './Q9.module.css';

const OPTIONS = [
  { emoji: '🕊️', label: 'Freedom' },
  { emoji: '🛡️', label: 'Security' },
  { emoji: '🗝️', label: 'Independence' },
  { emoji: '📚', label: 'Knowledge' },
  { emoji: '🏛️', label: 'Legacy' },
  { emoji: '😌', label: 'Peace' },
];

export default function Q9({ answer, onAnswer, onContinue, step, total, isLast, hasAnswer }) {
  return (
    <QuestionShell
      step={step}
      total={total}
      question="Deep down — what is this money really for?"
      onContinue={onContinue}
      hasAnswer={hasAnswer}
      isLast={isLast}
    >
      <div className={styles.grid}>
        {OPTIONS.map((opt) => (
          <button
            key={opt.label}
            className={`${styles.tile} ${answer === opt.label ? styles.selected : ''}`}
            onClick={() => onAnswer(opt.label)}
            type="button"
          >
            <span className={styles.emoji}>{opt.emoji}</span>
            <span className={styles.label}>{opt.label}</span>
          </button>
        ))}
      </div>
    </QuestionShell>
  );
}
