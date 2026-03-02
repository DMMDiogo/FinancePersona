import { useState, useEffect, useRef } from 'react';
import styles from './Processing.module.css';

const PHRASES = [
  'Reading your profile',
  'Mapping behavioral patterns',
  'Calculating risk geometry',
  'Building your portrait',
];

const DOTS = ['.', '..', '...'];

export default function Processing({ onDone }) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [dotsIdx, setDotsIdx] = useState(0);
  const pulseRef = useRef(null);

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDotsIdx((d) => (d + 1) % 3);
    }, 400);

    const phraseTimer = setInterval(() => {
      setPhraseIdx((p) => {
        if (p >= PHRASES.length - 1) return p;
        return p + 1;
      });
    }, 1000);

    const doneTimer = setTimeout(onDone, 4000);

    return () => {
      clearInterval(dotTimer);
      clearInterval(phraseTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={styles.processing}>
      <div className={styles.radarWrapper}>
        <svg viewBox="0 0 200 200" width="200" height="200" className={styles.radar}>
          {/* Axis lines */}
          {[0,1,2,3,4,5].map((i) => {
            const angle = (i * Math.PI * 2) / 6 - Math.PI / 2;
            return (
              <line
                key={i}
                x1="100" y1="100"
                x2={100 + 80 * Math.cos(angle)}
                y2={100 + 80 * Math.sin(angle)}
                stroke="rgba(0,245,255,0.15)"
                strokeWidth="1"
              />
            );
          })}
          {/* Concentric rings */}
          {[0.25, 0.5, 0.75, 1].map((r, i) => {
            const pts = [0,1,2,3,4,5].map((j) => {
              const angle = (j * Math.PI * 2) / 6 - Math.PI / 2;
              return `${100 + 80 * r * Math.cos(angle)},${100 + 80 * r * Math.sin(angle)}`;
            }).join(' ');
            return (
              <polygon
                key={i}
                points={pts}
                fill="none"
                stroke="rgba(0,245,255,0.12)"
                strokeWidth="1"
              />
            );
          })}
          {/* Inner polygon — animated */}
          <polygon
            ref={pulseRef}
            points={[0,1,2,3,4,5].map((j) => {
              const angle = (j * Math.PI * 2) / 6 - Math.PI / 2;
              const r = 0.6;
              return `${100 + 80 * r * Math.cos(angle)},${100 + 80 * r * Math.sin(angle)}`;
            }).join(' ')}
            fill="rgba(0,245,255,0.12)"
            stroke="rgba(0,245,255,0.7)"
            strokeWidth="1.5"
            className={styles.pulse}
          />
        </svg>
      </div>

      <p className={styles.phrase}>
        <span className={styles.phraseText}>{PHRASES[phraseIdx]}</span>
        <span className={styles.dots}>{DOTS[dotsIdx]}</span>
      </p>
    </div>
  );
}
