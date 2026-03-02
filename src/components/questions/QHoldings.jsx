import QuestionShell from './QuestionShell';
import styles from './QHoldings.module.css';

const ASSETS = [
  {
    key: 'savings_cash',
    emoji: '🏦',
    label: 'Savings / Cash',
    sub: 'Bank account or cash',
    color: '#a78bfa',
    // flat stable line
    points: '4,16 14,16 24,15 34,16 44,16 54,15 64,16 74,16 84,15',
  },
  {
    key: 'index_etf',
    emoji: '📊',
    label: 'Index Funds / ETFs',
    sub: 'Passive, diversified',
    color: '#00f5ff',
    // gentle upward slope with slight noise
    points: '4,20 14,18 24,16 34,15 44,13 54,11 64,9 74,8 84,6',
  },
  {
    key: 'bonds',
    emoji: '🏛️',
    label: 'Bonds',
    sub: 'Fixed income',
    color: '#00ff88',
    // near-flat with tiny oscillations
    points: '4,14 14,13 24,14 34,12 44,14 54,13 64,12 74,13 84,13',
  },
  {
    key: 'stocks',
    emoji: '📈',
    label: 'Individual Stocks',
    sub: 'Single companies',
    color: '#f5c842',
    // volatile up-down, generally upward
    points: '4,20 14,13 24,17 34,9 44,15 54,7 64,12 74,8 84,7',
  },
  {
    key: 'reits',
    emoji: '🏠',
    label: 'REITs / Real Estate',
    sub: 'Property investments',
    color: '#fb923c',
    // moderate volatility, upward
    points: '4,19 14,16 24,18 34,14 44,16 54,12 64,14 74,11 84,10',
  },
  {
    key: 'crypto_alt',
    emoji: '⚡',
    label: 'Crypto / Alternatives',
    sub: 'High volatility assets',
    color: '#f472b6',
    // extreme spikes
    points: '4,20 14,13 24,4 34,18 44,8 54,20 64,5 74,16 84,10',
  },
];

function Sparkline({ points, color, selected }) {
  const stroke = selected ? color : 'rgba(255,255,255,0.2)';
  const glow = selected ? color : 'transparent';
  return (
    <svg viewBox="0 0 88 24" width="100%" height="24" className={styles.sparkline}>
      <polyline
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth={selected ? 2 : 1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{ filter: selected ? `drop-shadow(0 0 4px ${glow})` : 'none', transition: 'stroke 0.2s, stroke-width 0.2s' }}
      />
    </svg>
  );
}

export default function QHoldings({ answer, onAnswer, onContinue, step, total, isLast, hasAnswer }) {
  const selected = Array.isArray(answer) ? answer : [];

  const handleClick = (key) => {
    const isSelected = selected.includes(key);
    const next = isSelected
      ? selected.filter((k) => k !== key)
      : [...selected, key];
    onAnswer(next);
  };

  // Allow empty selection — "none yet" is a valid answer
  // hasAnswer is true when the array exists (even empty after first interaction)
  // We treat any interaction as answered, so we override hasAnswer logic:
  // The continue button should always be enabled for this question.
  // We pass a custom hasAnswer = true always.

  return (
    <QuestionShell
      step={step}
      total={total}
      label="CURRENT PORTFOLIO"
      question="Which of these do you currently have money in?"
      onContinue={onContinue}
      hasAnswer={true}
      isLast={isLast}
    >
      <p className={styles.hint}>Select all that apply — or continue if none yet.</p>
      <div className={styles.grid}>
        {ASSETS.map((asset) => {
          const isSelected = selected.includes(asset.key);
          return (
            <button
              key={asset.key}
              className={`${styles.tile} ${isSelected ? styles.selected : ''}`}
              style={{ '--accent': asset.color }}
              onClick={() => handleClick(asset.key)}
              type="button"
            >
              <div className={styles.tileTop}>
                <span className={styles.emoji}>{asset.emoji}</span>
                <div className={styles.tileText}>
                  <span className={styles.label}>{asset.label}</span>
                  <span className={styles.sub}>{asset.sub}</span>
                </div>
              </div>
              <div className={styles.sparklineWrap}>
                <Sparkline points={asset.points} color={asset.color} selected={isSelected} />
              </div>
            </button>
          );
        })}
      </div>
    </QuestionShell>
  );
}
