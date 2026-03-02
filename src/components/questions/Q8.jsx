import QuestionShell from './QuestionShell';
import styles from './Q8.module.css';

const OPTIONS = [
  { emoji: '🔬', label: 'I go back and figure out exactly what I missed', sub: 'I need to understand the failure to move forward.' },
  { emoji: '✋', label: 'I feel it, sit with it, then move on', sub: "Bad calls happen. I process it and don't repeat it." },
  { emoji: '🎲', label: "These things happen — I don't dwell on it", sub: 'Risk is part of the game. Next opportunity.' },
];

export default function Q8({ answer, onAnswer, onContinue, step, total, isLast, hasAnswer }) {
  return (
    <QuestionShell
      step={step}
      total={total}
      label="YOUR REACTION PATTERN"
      question="You made a confident call. It turned out wrong. What happens next?"
      onContinue={onContinue}
      hasAnswer={hasAnswer}
      isLast={isLast}
    >
      <div className={styles.stack}>
        {OPTIONS.map((opt, i) => (
          <button
            key={i}
            className={`${styles.card} ${answer === i ? styles.selected : ''}`}
            onClick={() => onAnswer(i)}
            type="button"
          >
            <span className={styles.emoji}>{opt.emoji}</span>
            <div className={styles.info}>
              <span className={styles.text}>{opt.label}</span>
              <span className={styles.sub}>{opt.sub}</span>
            </div>
            <div className={styles.overlay} />
          </button>
        ))}
      </div>
    </QuestionShell>
  );
}
