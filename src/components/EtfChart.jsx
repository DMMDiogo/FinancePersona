import { useEffect, useState, useRef } from 'react';
import { fetchEtfChart } from '../utils/fetchEtfData';
import styles from './EtfChart.module.css';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const W = 400;
const PAD_FULL    = { top: 8, right: 12, bottom: 22, left: 12 };
const PAD_COMPACT = { top: 6, right: 10, bottom: 4,  left: 10 };

export default function EtfChart({ ticker, color, compact = false }) {
  const H = compact ? 70 : 110;
  const PAD = compact ? PAD_COMPACT : PAD_FULL;
  const PLOT_W = W - PAD.left - PAD.right;
  const PLOT_H = H - PAD.top - PAD.bottom;
  const [state, setState] = useState('loading');
  const [points, setPoints] = useState([]);
  const [yearBaseClose, setYearBaseClose] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [currencySymbol, setCurrencySymbol] = useState('€');
  const [hovered, setHovered] = useState(null);
  const svgRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    fetchEtfChart(ticker).then((data) => {
      if (cancelled) return;
      if (data) {
        // Decimate daily points (~252) to ~12 evenly spaced samples for the curve.
        // Preserve allPoints[0] as the accurate 1yr baseline for % calculation.
        const all = data.points;
        const step = Math.max(1, Math.floor(all.length / 12));
        const sampled = all.filter((_, i) => i % step === 0 || i === all.length - 1);
        setPoints(sampled);
        setYearBaseClose(all[0].close);
        setCurrentPrice(data.currentPrice);
        setCurrencySymbol(data.currencySymbol ?? '€');
        setState('ready');
      } else {
        setState('hidden');
      }
    });
    return () => { cancelled = true; };
  }, [ticker]);

  if (state === 'hidden') return null;
  if (state === 'loading') return <div className={compact ? styles.skeletonCompact : styles.skeleton} />;

  const closes = points.map((p) => p.close);
  const minC = Math.min(...closes);
  const maxC = Math.max(...closes);
  const span = maxC - minC || 1;

  const toX = (i) => PAD.left + (i / (points.length - 1)) * PLOT_W;
  const toY = (v) => PAD.top + PLOT_H - ((v - minC) / span) * PLOT_H;

  const linePoints = points.map((p, i) => `${toX(i)},${toY(p.close)}`).join(' ');
  const areaD = [
    `M ${toX(0)},${PAD.top + PLOT_H}`,
    ...points.map((p, i) => `L ${toX(i)},${toY(p.close)}`),
    `L ${toX(points.length - 1)},${PAD.top + PLOT_H}`,
    'Z',
  ].join(' ');

  const livePrice = currentPrice ?? closes[closes.length - 1];
  const baseline = yearBaseClose ?? closes[0];
  const yearChange = ((livePrice - baseline) / baseline) * 100;
  const isPos = yearChange >= 0;
  const gradId = `g-${ticker.replace(/[^a-zA-Z0-9]/g, '')}`;

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * W - PAD.left;
    const idx = Math.round((relX / PLOT_W) * (points.length - 1));
    setHovered(Math.max(0, Math.min(points.length - 1, idx)));
  };

  // Tooltip geometry
  const TIP_W = 104, TIP_H = 18;
  const tipX = hovered !== null
    ? Math.max(PAD.left, Math.min(toX(hovered) - TIP_W / 2, W - PAD.right - TIP_W))
    : 0;
  const tipY = hovered !== null
    ? Math.max(PAD.top, toY(points[hovered].close) - TIP_H - 8)
    : 0;

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.liveRow}>
          {currentPrice != null && (
            <span className={compact ? styles.livePriceCompact : styles.livePrice}>
              {currencySymbol}{currentPrice.toFixed(2)}
            </span>
          )}
          <span className={styles.liveDot}>◉</span>
          <span className={styles.liveLabel}>LIVE</span>
        </div>
        <span className={isPos ? (compact ? styles.positiveCompact : styles.positive) : (compact ? styles.negativeCompact : styles.negative)}>
          {isPos ? '+' : ''}{yearChange.toFixed(1)}% 1yr
        </span>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className={styles.svg}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHovered(null)}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <path d={areaD} fill={`url(#${gradId})`} />

        {/* Line */}
        <polyline
          points={linePoints}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Month labels — full mode only */}
        {!compact && points.map((p, i) => {
          const step = points.length > 8 ? 2 : 1;
          if (i % step !== 0 && i !== points.length - 1) return null;
          return (
            <text
              key={i}
              x={toX(i)}
              y={H - 4}
              textAnchor="middle"
              fontSize="8"
              fill="rgba(232,232,240,0.22)"
              fontFamily="'Space Mono', monospace"
            >
              {MONTHS[p.date.getMonth()]}
            </text>
          );
        })}

        {/* Hover crosshair + tooltip */}
        {hovered !== null && (
          <>
            <line
              x1={toX(hovered)} y1={PAD.top}
              x2={toX(hovered)} y2={PAD.top + PLOT_H}
              stroke={color}
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.35"
            />
            <circle
              cx={toX(hovered)}
              cy={toY(points[hovered].close)}
              r="3.5"
              fill={color}
            />
            <rect
              x={tipX} y={tipY}
              width={TIP_W} height={TIP_H}
              rx="3"
              fill="rgba(10,10,18,0.92)"
            />
            <text
              x={tipX + TIP_W / 2}
              y={tipY + 12}
              textAnchor="middle"
              fontSize="9"
              fill="rgba(232,232,240,0.88)"
              fontFamily="'Space Mono', monospace"
            >
              {MONTHS[points[hovered].date.getMonth()]} {points[hovered].date.getFullYear()} · {points[hovered].close.toFixed(2)}
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
