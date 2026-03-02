import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Q7.module.css';

const FEEDBACKS = {
  sell: { text: 'You protected yourself. You also locked in the loss. Most who sold in 2020 missed the fastest recovery in history.', color: 'red' },
  hold: { text: "Harder than it looks. Most people don't. That minority consistently outperforms.", color: 'muted' },
  buy:  { text: "Either very smart or very confident. The market rewards this — if you can handle it getting worse first.", color: 'green' },
};

const GROWTH_COUNT = 65; // points for the rise
const DROP_COUNT   = 35; // points for the crash

function buildAllPoints(w, h) {
  const pts = [];

  // ── Growth segment: left 68% of canvas ──
  const growthEndX = w * 0.68;
  const baseY = h * 0.62;
  for (let i = 0; i < GROWTH_COUNT; i++) {
    const t = i / (GROWTH_COUNT - 1);
    const noise = (Math.random() - 0.5) * h * 0.05;
    const trend = -t * h * 0.24; // gentle uptrend
    pts.push({ x: w * 0.04 + t * (growthEndX - w * 0.04), y: baseY + trend + noise });
  }

  // ── Drop segment: right 32% of canvas ──
  const peak = pts[pts.length - 1];
  const dropEndX = w * 0.96;
  for (let i = 1; i <= DROP_COUNT; i++) {
    const t = i / DROP_COUNT;
    const noise = (Math.random() - 0.5) * h * 0.025;
    // steep drop then slight stabilise
    const curve = t < 0.7 ? t * 1.2 : 0.84 + (t - 0.7) * 0.3;
    const drop = Math.min(curve, 1) * h * 0.38;
    pts.push({ x: peak.x + t * (dropEndX - peak.x), y: peak.y + drop + noise });
  }

  return pts;
}

export default function Q7({ onAutoAdvance, step, total }) {
  const [phase, setPhase] = useState('growing'); // growing | dropping | deciding | feedback
  const [countdown, setCountdown] = useState(10);
  const [choice, setChoice] = useState(null);

  const canvasRef  = useRef(null);
  const animRef    = useRef(null);
  const startRef   = useRef(null);
  const phaseRef   = useRef('growing');
  const allPtsRef  = useRef([]);
  const timerRef   = useRef(null);

  // ── Draw the full visible history with a cyan→red color split ──
  const drawChart = useCallback((ctx, w, h, allPts, visibleCount) => {
    ctx.clearRect(0, 0, w, h);
    if (!allPts || visibleCount < 2) return;

    const visible = allPts.slice(0, visibleCount);
    const splitAt = Math.min(GROWTH_COUNT, visibleCount); // index where red begins

    const drawSegment = (pts, color) => {
      if (pts.length < 2) return;

      // fill
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, color === 'red' ? 'rgba(255,59,92,0.15)' : 'rgba(0,245,255,0.15)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      pts.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.lineTo(pts[pts.length - 1].x, h);
      ctx.lineTo(pts[0].x, h);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // line
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      pts.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = color === 'red' ? '#ff3b5c' : '#00f5ff';
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.lineCap  = 'round';
      ctx.stroke();
    };

    // growth portion (cyan)
    const growthSeg = visible.slice(0, splitAt);
    drawSegment(growthSeg, 'cyan');

    // drop portion (red) — shares the last growth point for continuity
    if (visibleCount > GROWTH_COUNT) {
      const dropSeg = visible.slice(GROWTH_COUNT - 1);
      drawSegment(dropSeg, 'red');
    }

    // dot at tip
    const tip = visible[visible.length - 1];
    const inDrop = visibleCount > GROWTH_COUNT;
    ctx.beginPath();
    ctx.arc(tip.x, tip.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = inDrop ? '#ff3b5c' : '#00f5ff';
    if (inDrop) ctx.shadowColor = '#ff3b5c';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
  }, []);

  // ── Animation loop ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    allPtsRef.current = buildAllPoints(w, h);
    const totalPts = allPtsRef.current.length; // GROWTH_COUNT + DROP_COUNT
    startRef.current = performance.now();

    const animate = (now) => {
      const elapsed = now - startRef.current;
      const ph = phaseRef.current;

      if (ph === 'growing') {
        const prog = Math.min(elapsed / 2000, 1);
        const count = Math.max(2, Math.floor(GROWTH_COUNT * prog));
        drawChart(ctx, w, h, allPtsRef.current, count);

        if (prog < 1) {
          animRef.current = requestAnimationFrame(animate);
        } else {
          // switch to drop
          phaseRef.current = 'dropping';
          setPhase('dropping');
          startRef.current = performance.now();
          animRef.current = requestAnimationFrame(animate);
        }
      } else if (ph === 'dropping') {
        const prog = Math.min(elapsed / 1500, 1);
        const count = GROWTH_COUNT + Math.floor(DROP_COUNT * prog);
        drawChart(ctx, w, h, allPtsRef.current, count);

        if (prog < 1) {
          animRef.current = requestAnimationFrame(animate);
        } else {
          drawChart(ctx, w, h, allPtsRef.current, totalPts);
          phaseRef.current = 'deciding';
          setPhase('deciding');
        }
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [drawChart]);

  // ── Countdown ──
  useEffect(() => {
    if (phase !== 'deciding') return;
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timerRef.current);
          handleChoice('hold');
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const handleChoice = (val) => {
    if (choice) return;
    clearInterval(timerRef.current);
    setChoice(val);
    setPhase('feedback');
    setTimeout(() => onAutoAdvance(val), 2500);
  };

  const pad = (n) => String(n).padStart(2, '0');
  const isDropPhase = phase === 'dropping' || phase === 'deciding' || phase === 'feedback';

  return (
    <div className={styles.wrapper}>
      <div className={styles.meta}>
        <span className={styles.counter}>{pad(step + 1)}/{pad(total)}</span>
        <span className={styles.labelText}>◈ PRESSURE SIMULATION</span>
      </div>

      {phase !== 'feedback' && (
        <>
          <div className={styles.header}>
            <div className={styles.portfolioLabel}>MY PORTFOLIO</div>
            <div className={styles.portfolioValue}>
              {isDropPhase ? '€7,800' : '€10,000'}
            </div>
            <div className={styles.portfolioChange} data-dropping={isDropPhase}>
              {isDropPhase ? '−22.0%' : '+12.4%'}
            </div>
          </div>

          <div className={styles.canvasWrapper}>
            <canvas ref={canvasRef} width={560} height={200} className={styles.canvas} />
            {phase === 'deciding' && (
              <div className={styles.turmoil}>⚠ MARKETS IN TURMOIL — ANALYSTS DIVIDED</div>
            )}
          </div>

          {phase === 'growing' && (
            <p className={styles.status}>WATCHING YOUR PORTFOLIO...</p>
          )}

          {phase === 'deciding' && (
            <div className={styles.decideSection}>
              <div className={styles.countdown}>{String(countdown).padStart(2, '0')}</div>
              <div className={styles.actions}>
                <button className={`${styles.btn} ${styles.btnRed}`}   onClick={() => handleChoice('sell')} type="button">SELL EVERYTHING</button>
                <button className={`${styles.btn} ${styles.btnMuted}`} onClick={() => handleChoice('hold')} type="button">HOLD</button>
                <button className={`${styles.btn} ${styles.btnGreen}`} onClick={() => handleChoice('buy')}  type="button">BUY MORE</button>
              </div>
            </div>
          )}
        </>
      )}

      {phase === 'feedback' && choice && (
        <div className={styles.feedback}>
          <p className={styles.feedbackText} data-color={FEEDBACKS[choice].color}>
            {FEEDBACKS[choice].text}
          </p>
        </div>
      )}
    </div>
  );
}
