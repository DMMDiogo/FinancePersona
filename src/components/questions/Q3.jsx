import { useState, useEffect } from 'react';
import QuestionShell from './QuestionShell';
import styles from './Q3.module.css';

const OPTIONS = [
  { text: 'Completely fine — I have a buffer for this', sub: 'No stress at all' },
  { text: "Manageable, but I'd feel it", sub: 'Uncomfortable but okay' },
  { text: "Stressful — it would mess up my month", sub: 'Real pressure' },
  { text: "Honestly, it would be a real crisis right now", sub: 'Not in a position to invest yet' },
];

export default function Q3({ answer, onAnswer, onContinue, step, total, isLast, hasAnswer }) {
  const [powerPhase, setPowerPhase] = useState('on'); // 'on' | 'flicker' | 'off'
  const [showZones, setShowZones] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPowerPhase('flicker'), 800);
    const t2 = setTimeout(() => setPowerPhase('off'), 1400);
    const t3 = setTimeout(() => setShowZones(true), 2200);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <QuestionShell
      step={step}
      total={total}
      label="FINANCIAL FOUNDATION"
      question="The power just went out. It's been a week. How does your financial situation hold up?"
      onContinue={onContinue}
      hasAnswer={hasAnswer}
      isLast={isLast}
    >
      <div className={`${styles.scene} ${powerPhase === 'off' ? styles.sceneDark : ''}`}>
        <div className={`${styles.lights} ${powerPhase === 'flicker' ? styles.flicker : ''}`}>
          <div className={styles.window} />
          <div className={styles.window} />
          <div className={styles.lamp} />
          <div className={styles.glow} />
        </div>
        {powerPhase === 'off' && <div className={styles.powerLabel}>⚡ POWER CUT</div>}
      </div>
      {showZones && (
        <div className={styles.zones}>
          {OPTIONS.map((opt, i) => (
            <button
              key={i}
              className={`${styles.zone} ${answer === i ? styles.selected : ''}`}
              onClick={() => onAnswer(i)}
              type="button"
            >
              <span className={`${styles.dot} ${answer === i ? styles.dotSelected : ''}`} />
              <div className={styles.info}>
                <span className={styles.text}>{opt.text}</span>
                <span className={styles.sub}>{opt.sub}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </QuestionShell>
  );
}
