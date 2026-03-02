import styles from './QuestionShell.module.css';

export default function QuestionShell({
  step,
  total,
  label,
  question,
  children,
  onContinue,
  hasAnswer,
  isLast,
  autoAdvance = false,
}) {
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className={styles.shell}>
      <div className={styles.meta}>
        <span className={styles.counter}>{pad(step + 1)}/{pad(total)}</span>
        {label && <span className={styles.label}>{label}</span>}
      </div>

      <h2 className={styles.question}>{question}</h2>

      <div className={styles.content}>{children}</div>

      {!autoAdvance && (
        <button
          className={styles.continueBtn}
          onClick={onContinue}
          disabled={!hasAnswer}
          type="button"
        >
          {isLast ? 'BUILD MY PROFILE →' : 'CONTINUE →'}
        </button>
      )}
    </div>
  );
}
