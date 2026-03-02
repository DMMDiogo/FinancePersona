import QuestionShell from './QuestionShell';
import styles from './Q1.module.css';

const OPTIONS = [
  { emoji: '🎯', text: 'Better than average — I can spot things others miss', sub: 'I trust my instincts' },
  { emoji: '⚖️', text: 'About the same as most people, I think', sub: 'Calibrated self-awareness' },
  { emoji: '🔍', text: "I'm not sure — I'd want to research carefully first", sub: 'Cautious before committing' },
  { emoji: '🤷', text: "Honestly, I wouldn't know a good one from a bad one", sub: 'Starting from zero' },
];

export default function Q1({ answer, onAnswer, onContinue, step, total, isLast, hasAnswer }) {
  return (
    <QuestionShell
      step={step}
      total={total}
      label="BE HONEST"
      question="Compared to most people — how good are you at judging a worthwhile investment opportunity?"
      onContinue={onContinue}
      hasAnswer={hasAnswer}
      isLast={isLast}
    >
      <div className={styles.grid}>
        {OPTIONS.map((opt, i) => (
          <button
            key={i}
            className={`${styles.card} ${answer === i ? styles.selected : ''}`}
            onClick={() => onAnswer(i)}
            type="button"
          >
            <span className={styles.emoji}>{opt.emoji}</span>
            <span className={styles.text}>{opt.text}</span>
            <span className={styles.sub}>{opt.sub}</span>
            <div className={styles.overlay} />
          </button>
        ))}
      </div>
    </QuestionShell>
  );
}
