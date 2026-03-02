import { useState } from 'react';
import styles from './QTimeHorizon.module.css';

const SNAPS = [
  { value: '1yr',   label: '1 yr',   display: '1 year',   milestone: 'Short-term goal' },
  { value: '3yr',   label: '3 yrs',  display: '3 years',  milestone: 'Near-term plan' },
  { value: '5yr',   label: '5 yrs',  display: '5 years',  milestone: 'Medium horizon' },
  { value: '10yr',  label: '10 yrs', display: '10 years', milestone: 'Long-term build' },
  { value: '20yr',  label: '20 yrs', display: '20 years', milestone: 'Wealth project' },
  { value: '30yr+', label: '30+ yrs',display: '30+ years','milestone': 'Generational build' },
];

const COLORS = ['#f5c842', '#fb923c', '#34d399', '#00f5ff', '#00f5ff', '#00f5ff'];

export default function QTimeHorizon({ onAutoAdvance, step, total }) {
  const [snapIndex, setSnapIndex] = useState(null);
  const [interacted, setInteracted] = useState(false);

  const pad = (n) => String(n).padStart(2, '0');

  const handleChange = (e) => {
    const idx = Number(e.target.value);
    setSnapIndex(idx);
    if (!interacted) setInteracted(true);
  };

  const handleCommit = () => {
    if (!interacted || snapIndex === null) return;
    onAutoAdvance(SNAPS[snapIndex].value);
  };

  const currentSnap = snapIndex !== null ? SNAPS[snapIndex] : null;
  const currentColor = snapIndex !== null ? COLORS[snapIndex] : 'rgba(255,255,255,0.15)';
  const fillPct = snapIndex !== null ? (snapIndex / (SNAPS.length - 1)) * 100 : 0;

  return (
    <div className={styles.wrapper}>
      {/* meta */}
      <div className={styles.meta}>
        <span className={styles.counter}>{pad(step + 1)}/{pad(total)}</span>
        <span className={styles.labelTag}>◈ TIME HORIZON</span>
      </div>

      <h2 className={styles.question}>
        When you picture this money actually doing something for you — how far away is that?
      </h2>

      {/* Display area */}
      <div className={styles.display}>
        {currentSnap ? (
          <>
            <span className={styles.displayYear} style={{ color: currentColor }}>
              {currentSnap.display}
            </span>
            <span className={styles.displayMilestone}>{currentSnap.milestone}</span>
          </>
        ) : (
          <span className={styles.displayPrompt}>drag the slider →</span>
        )}
      </div>

      {/* Slider */}
      <div className={styles.sliderWrap} style={{ '--thumb-color': currentColor }}>
        <div className={styles.trackWrap}>
          {/* filled track layer */}
          <div
            className={styles.trackFill}
            style={{
              width: `${fillPct}%`,
              background: `linear-gradient(to right, #f5c842, ${currentColor})`,
              boxShadow: interacted ? `0 0 8px ${currentColor}` : 'none',
            }}
          />
          <input
            type="range"
            min={0}
            max={SNAPS.length - 1}
            step={1}
            value={snapIndex ?? 0}
            onChange={handleChange}
            className={styles.range}
          />
        </div>

        {/* Tick labels */}
        <div className={styles.ticks}>
          {SNAPS.map((snap, i) => {
            const pct = (i / (SNAPS.length - 1)) * 100;
            const isActive = snapIndex === i;
            return (
              <div
                key={snap.value}
                className={`${styles.tick} ${isActive ? styles.tickActive : ''}`}
                style={{ left: `${pct}%`, color: isActive ? COLORS[i] : undefined }}
              >
                <div className={`${styles.tickDot} ${isActive ? styles.tickDotActive : ''}`}
                  style={{ background: isActive ? COLORS[i] : undefined, boxShadow: isActive ? `0 0 6px ${COLORS[i]}` : undefined }}
                />
                <span className={styles.tickLabel}>{snap.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue button */}
      <button
        className={styles.continueBtn}
        onClick={handleCommit}
        disabled={!interacted}
        type="button"
        style={{ borderColor: interacted ? currentColor : undefined, color: interacted ? currentColor : undefined }}
      >
        BUILD MY PROFILE →
      </button>
    </div>
  );
}
