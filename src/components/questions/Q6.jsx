import QuestionShell from './QuestionShell';
import styles from './Q6.module.css';

const OPTIONS = [
  { name: 'Alex, 34',   color: '#f5c842', quote: 'Quit their job and is travelling for a year on savings' },
  { name: 'Jordan, 29', color: '#00f5ff', quote: "Made serious money on something you'd never heard of" },
  { name: 'Sam, 41',    color: '#00ff88', quote: 'Paid off their mortgage five years early' },
  { name: 'Pat, 37',    color: '#a78bfa', quote: "Just says they don't worry about money anymore" },
];

export default function Q6({ answer, onAnswer, onContinue, step, total, isLast, hasAnswer }) {
  return (
    <QuestionShell
      step={step} total={total} isLast={isLast} hasAnswer={hasAnswer}
      question="Dinner party. Something someone said is still in your head on the drive home. Which one?"
      onContinue={onContinue}
    >
      <div className={styles.grid}>
        {OPTIONS.map((opt, i) => (
          <button
            key={i}
            className={`${styles.card} ${answer === i ? styles.selected : ''}`}
            onClick={() => onAnswer(i)}
            type="button"
            style={{ '--accent': opt.color, '--i': i }}
          >
            <div className={styles.avatar}>{opt.name.charAt(0)}</div>
            <div className={styles.bubble}>
              <p className={styles.quote}>{opt.quote}</p>
              <span className={styles.name}>{opt.name}</span>
            </div>
          </button>
        ))}
      </div>
    </QuestionShell>
  );
}
