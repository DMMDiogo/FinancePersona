import QuestionShell from './QuestionShell';
import styles from './Q4.module.css';

const OPTIONS = [
  { emoji: '🌱', label: 'Complete beginner', sub: "I haven't started. Terms like ETF or index fund are new to me.", value: 'beginner' },
  { emoji: '📖', label: 'I know the basics', sub: "I understand the concepts but haven't invested yet, or just started.", value: 'basic' },
  { emoji: '📈', label: 'Actively investing', sub: "I have a portfolio. I know what I own and roughly why.", value: 'experienced' },
  { emoji: '🔬', label: 'I follow this closely', sub: "Markets, funds, expense ratios — I track this stuff.", value: 'advanced' },
];

export default function Q4({ answer, onAnswer, onContinue, step, total, isLast, hasAnswer }) {
  return (
    <QuestionShell
      step={step}
      total={total}
      label="WHERE YOU'RE STARTING FROM"
      question="When it comes to investing, be honest about where you are right now."
      onContinue={onContinue}
      hasAnswer={hasAnswer}
      isLast={isLast}
    >
      <div className={styles.grid}>
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`${styles.card} ${answer === opt.value ? styles.selected : ''}`}
            onClick={() => onAnswer(opt.value)}
            type="button"
          >
            <span className={styles.emoji}>{opt.emoji}</span>
            <span className={styles.text}>{opt.label}</span>
            <span className={styles.sub}>{opt.sub}</span>
            <div className={styles.overlay} />
          </button>
        ))}
      </div>
    </QuestionShell>
  );
}
