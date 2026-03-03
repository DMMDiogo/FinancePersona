import { useState, useEffect, useRef } from 'react';
import { ARCHETYPES } from '../data/archetypes';
import PixelArt from './PixelArt';
import EtfLiveBadge from './EtfLiveBadge';
import EtfChart from './EtfChart';
import { downloadResultCard } from '../utils/downloadCard';
import styles from './Result.module.css';

const AXES = ['Risk', 'Patience', 'Resilience', 'Discipline', 'Influence', 'Self-Know.'];
const AXIS_KEYS = ['risk', 'patience', 'resilience', 'discipline', 'influence', 'selfKnow'];

const ARCHETYPE_COLORS = {
  builder:     { fill: 'rgba(0,245,255,0.15)',   stroke: 'rgba(0,245,255,0.8)' },
  overthinker: { fill: 'rgba(168,85,247,0.15)',  stroke: 'rgba(168,85,247,0.8)' },
  gambler:     { fill: 'rgba(245,200,66,0.15)',  stroke: 'rgba(245,200,66,0.8)' },
  protector:   { fill: 'rgba(34,197,94,0.15)',   stroke: 'rgba(34,197,94,0.8)' },
};

const EXPLAINER_DATA = {
  builder: [
    { icon: '🌍', title: '3,700 companies', body: "When you buy VWCE, you own a tiny slice of Apple, Toyota, Nestlé, Samsung, and 3,700 other companies across 50+ countries. One fund. Everything in it." },
    { icon: '⏳', title: 'Time is the engine', body: "VWCE has returned an average of ~8–9% per year historically. €200/month invested for 20 years at 8% becomes roughly €116,000. The math works if you don't interrupt it." },
    { icon: '💸', title: 'What it costs you', body: "0.22% per year. On €10,000 invested, that's €22 annually — taken automatically. You never see a bill. That's the fee." },
  ],
  overthinker: [
    { icon: '📊', title: 'The benchmark everyone compares to', body: "IWDA tracks the MSCI World index — 1,600 companies across 23 developed countries. It's the number most fund managers are trying to beat. Most don't." },
    { icon: '🔒', title: 'No emerging market risk', body: "Unlike all-world funds, IWDA skips China, India, Brazil. You miss ~10% of global markets but gain stability. A deliberate, defensible tradeoff." },
    { icon: '💸', title: 'What it costs you', body: "0.20% per year. €20 annually on €10,000. This is the global standard for cost efficiency in a world ETF." },
  ],
  gambler: [
    { icon: '🇺🇸', title: 'The 500 most powerful companies on earth', body: "CSPX holds Apple, Microsoft, Nvidia, Amazon, Google, Meta — the companies that defined the last 30 years. The S&P 500 has returned ~10% annually on average since 1957." },
    { icon: '🛡️', title: 'Why you hold 20% cash', body: "Not dry powder for tips. A seatbelt. When markets crash, you won't need to sell your core position because you have liquidity. This is the structure that saves Gamblers from themselves." },
    { icon: '💸', title: 'What it costs you', body: "0.07% on CSPX. €7 per year on €10,000. Cheapest way to own the S&P 500 as a European investor." },
  ],
  protector: [
    { icon: '🏛️', title: '13,000 bonds, mostly governments', body: "AGGH holds bonds from governments and large corporations across the world. Bonds are IOUs — stable income, predictable behavior. 70% of your portfolio here anchors everything." },
    { icon: '🌱', title: 'Why you still hold 30% equities', body: "Inflation is silent. If your return is below inflation, you're losing wealth while feeling safe. The 30% VWCE sleeve is your inflation defense. Remove it and 'safe' costs you money." },
    { icon: '💸', title: 'What it costs you', body: "AGGH: 0.10%/year. VWCE: 0.22%/year. Combined weighted cost: ~0.14% on €10,000 = €14/year." },
  ],
};

const STATS_DATA = {
  builder: [
    { raw: 8.4, format: (v) => `${v.toFixed(1)}%`, label: 'VWCE AVG ANNUAL RETURN', context: 'Historical average since inception (gross, before tax)' },
    { raw: 0.22, format: (v) => `${v.toFixed(2)}%`, label: 'WHAT THE FUND COSTS YOU', context: 'Per year. €22 on €10,000. Nothing else.' },
    { raw: 116, format: (v) => `€${Math.round(v)}K`, label: '€200/MONTH FOR 20 YEARS AT 8%', context: 'Compound math. The number that changes minds.' },
  ],
  overthinker: [
    { raw: 88, format: (v) => `${Math.round(v)}%`, label: 'ACTIVE FUNDS IWDA OUTPERFORMS', context: "Over 15 years. Most managers can't beat it." },
    { raw: 1600, format: (v) => `${Math.round(v).toLocaleString()}`, label: 'COMPANIES IN IWDA', context: 'Across 23 developed countries. The benchmark.' },
    { raw: 0.20, format: (v) => `${v.toFixed(2)}%`, label: 'TOTAL ANNUAL COST', context: '€20 per year on €10,000. Hard to beat.' },
  ],
  gambler: [
    { raw: 10.2, format: (v) => `${v.toFixed(1)}%`, label: "S&P 500 AVG ANNUAL RETURN SINCE 1957", context: 'Including crashes, bubbles, recessions — all of it.' },
    { raw: 87, format: (v) => `${Math.round(v)}%`, label: 'SOCIAL TIPS THAT BEAT INDEX', context: "Don't. None of them. Over 10 years." },
    { raw: 20, format: (v) => `${Math.round(v)}%`, label: 'YOUR CASH BUFFER', context: 'The rule that makes everything else survivable.' },
  ],
  protector: [
    { raw: 3.5, format: (v) => `${v.toFixed(1)}%`, label: 'AVG EU INFLATION RATE (10YR)', context: "What 'safe' has to beat just to stay still." },
    { raw: 70, format: (v) => `${Math.round(v)}/30`, label: 'YOUR ALLOCATION', context: 'Bonds anchor. Equities grow. The floor holds.' },
    { raw: 0.14, format: (v) => `${v.toFixed(2)}%`, label: 'BLENDED ANNUAL COST', context: 'AGGH + VWCE weighted. €14/year on €10,000.' },
  ],
};

function StatCard({ stat }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        const start = performance.now();
        const animate = (now) => {
          const t = Math.min((now - start) / 1500, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setVal(stat.raw * eased);
          if (t < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [stat.raw]);

  return (
    <div ref={ref} className={styles.statCard}>
      <span className={styles.statNumber}>{stat.format(val)}</span>
      <span className={styles.statLabel}>{stat.label}</span>
      <span className={styles.statContext}>{stat.context}</span>
    </div>
  );
}

function RadarChart({ scores, size = 280, colors }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const duration = 1000;
    const animate = (now) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const getPoint = (i, value) => {
    const angle = (i * Math.PI * 2) / 6 - Math.PI / 2;
    const rVal = (value / 10) * r * progress;
    return {
      x: cx + rVal * Math.cos(angle),
      y: cy + rVal * Math.sin(angle),
    };
  };

  const ringPoints = (fraction) =>
    [0,1,2,3,4,5].map((i) => {
      const angle = (i * Math.PI * 2) / 6 - Math.PI / 2;
      return `${cx + r * fraction * Math.cos(angle)},${cy + r * fraction * Math.sin(angle)}`;
    }).join(' ');

  const userPts = AXIS_KEYS.map((k, i) => getPoint(i, scores[k]));
  const userPolygon = userPts.map((p) => `${p.x},${p.y}`).join(' ');

  const labelPts = AXIS_KEYS.map((_, i) => {
    const angle = (i * Math.PI * 2) / 6 - Math.PI / 2;
    return { x: cx + (r + 20) * Math.cos(angle), y: cy + (r + 20) * Math.sin(angle) };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className={styles.radarSvg}>
      {/* Axis lines */}
      {[0,1,2,3,4,5].map((i) => {
        const angle = (i * Math.PI * 2) / 6 - Math.PI / 2;
        return (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={cx + r * Math.cos(angle)}
            y2={cy + r * Math.sin(angle)}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        );
      })}
      {/* Concentric rings */}
      {[0.25, 0.5, 0.75, 1].map((frac, i) => (
        <polygon
          key={i}
          points={ringPoints(frac)}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}
      {/* User polygon */}
      <polygon
        points={userPolygon}
        fill={colors.fill}
        stroke={colors.stroke}
        strokeWidth="1.5"
      />
      {/* Axis labels */}
      {AXES.map((label, i) => (
        <text
          key={i}
          x={labelPts[i].x}
          y={labelPts[i].y}
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgba(232,232,240,0.4)"
          fontFamily="'Space Mono', monospace"
          fontSize="9"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

function BarLegend({ scores, color }) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const duration = 1000;
    const animate = (now) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const t = Math.min(elapsed / duration, 1);
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div className={styles.legend}>
      {AXIS_KEYS.map((key, i) => {
        const val = scores[key];
        return (
          <div key={key} className={styles.legendRow} style={{ animationDelay: `${i * 0.1}s` }}>
            <span className={styles.legendLabel}>{AXES[i].toUpperCase()}</span>
            <div className={styles.barTrack}>
              <div
                className={styles.barFill}
                style={{ width: `${(val / 10) * 100 * progress}%`, background: color }}
              />
            </div>
            <span className={styles.legendScore} style={{ color }}>{val}</span>
          </div>
        );
      })}
    </div>
  );
}

function Accordion({ tag, title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={styles.accordion}>
      <button
        className={styles.accordionHeader}
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <span className={styles.accordionTag}>{tag}</span>
        <span className={styles.accordionTitle}>{title}</span>
        <span className={`${styles.accordionToggle} ${open ? styles.accordionOpen : ''}`}>+</span>
      </button>
      {open && <div className={styles.accordionBody}>{children}</div>}
    </div>
  );
}

export default function Result({ archetype: archetypeKey, suitability, answers, onRetake }) {
  const archetype = ARCHETYPES[archetypeKey];
  const emergencyFlag = answers[2] === 3;
  const literacy = answers[1];
  const colors = ARCHETYPE_COLORS[archetypeKey];
  const resolvedSuitability = suitability ?? 'growth';

  const handleDownload = () => {
    downloadResultCard(archetypeKey, archetype);
  };

  return (
    <main className={styles.result}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <PixelArt archetype={archetypeKey} size={160} />
          <div className={styles.headerText}>
            <p className={styles.headerLabel}>YOUR FINANCIAL PERSONA</p>
            <h1 className={styles.archetypeName}>{archetype.name}</h1>
            <blockquote className={styles.quote}>
              {archetype.quote.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </blockquote>
          </div>
        </div>
      </div>

      {emergencyFlag && (
        <div className={styles.emergencyNote}>
          <span className={styles.emergencyIcon}>⚠</span>
          <p>
            Before investing, build a 3-month emergency buffer first. Everything below still
            applies to your personality — bookmark this for when you're ready.
          </p>
        </div>
      )}

      {/* ── Radar section ── */}
      <div className={styles.radarSection}>
        <div className={styles.radarLeft}>
          <RadarChart scores={archetype.radarScores} size={280} colors={colors} />
        </div>
        <div className={styles.radarRight}>
          <BarLegend scores={archetype.radarScores} color={colors.stroke} />
        </div>
      </div>

      {/* ── Accordion sections ── */}
      <div className={styles.sections}>
        <Accordion tag="01" title="YOUR MOVE" defaultOpen>
          <SectionMove archetype={archetype} suitability={resolvedSuitability} literacy={literacy} color={colors.stroke} />
        </Accordion>

        <Accordion tag="02" title="WHAT YOU'RE ACTUALLY BUYING">
          <SectionExplainer archetypeKey={archetypeKey} />
        </Accordion>

        <Accordion tag="03" title="WHAT WILL STOP YOU">
          <SectionTrap archetype={archetype} />
        </Accordion>

        <Accordion tag="04" title="YOUR RULEBOOK">
          <SectionRules archetype={archetype} />
        </Accordion>

        <Accordion tag="05" title="THE NUMBERS THAT ACTUALLY MATTER">
          <SectionStats archetypeKey={archetypeKey} />
        </Accordion>
      </div>

      {/* ── CTAs ── */}
      <div className={styles.ctas}>
        <button
          className={styles.downloadBtn}
          onClick={handleDownload}
          type="button"
        >
          DOWNLOAD CARD ↓
        </button>
        <button
          className={styles.retakeBtn}
          onClick={onRetake}
          type="button"
        >
          RETAKE QUIZ →
        </button>
      </div>
    </main>
  );
}

function SectionMove({ archetype, suitability, literacy, color }) {
  const etf = archetype.suitabilityEtf?.[suitability] ?? archetype.etf;
  const isNotReady = etf.isin === null;

  return (
    <div className={styles.moveSection}>

      {/* ── Suitability context line ── */}
      {suitability === 'conservative' && (
        <div className={styles.suitabilityNote}>
          <span className={styles.suitabilityIcon}>◈</span>
          <span>Based on your horizon and foundation, here's your direction right now:</span>
        </div>
      )}
      {suitability === 'moderate' && (
        <div className={styles.suitabilityNote}>
          <span className={styles.suitabilityIcon}>◈</span>
          <span>Your situation supports equity — with some cushioning. Here's the right structure:</span>
        </div>
      )}

      {/* ── Fund identity ── */}
      <div className={styles.etfIdentity}>
        <span className={styles.etfTicker}>{etf.ticker}</span>
        <span className={styles.etfName}>{etf.name}</span>
        {!isNotReady && <EtfLiveBadge ticker={etf.ticker} />}
        {literacy === 'advanced' && etf.isin && (
          <span className={styles.etfAdvanced}>ISIN: {etf.isin} · AUM: {etf.aum}</span>
        )}
      </div>

      {/* ── Chart ── */}
      {!isNotReady && <EtfChart ticker={etf.ticker} color={color} />}

      {/* ── What you're buying ── */}
      <p className={styles.etfDesc}>{etf.description}</p>

      {literacy === 'beginner' && (
        <p className={styles.literacyNote}>
          ETF = Exchange-Traded Fund. A basket holding hundreds of companies' stocks.
          You buy one unit of the basket and own a tiny piece of everything inside.
        </p>
      )}

      {/* ── Why this fits you ── */}
      <div className={styles.whySection}>
        <span className={styles.whySectionLabel}>WHY THIS FOR YOU</span>
        <div className={styles.whyList}>
          {etf.why.map((w, i) => (
            <div key={i} className={styles.whyRow}>
              <span className={styles.whyArrow}>→</span>
              <span className={styles.whyText}>{w}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Alternatives ── */}
      {etf.alternatives && (
        <div className={styles.altBlock}>
          <span className={styles.altLabel}>ALTERNATIVES</span>
          <p className={styles.etfAlternatives}>{etf.alternatives}</p>
        </div>
      )}

    </div>
  );
}

function SectionTrap({ archetype }) {
  return (
    <div className={styles.trapBox}>
      <span className={styles.trapLabel}>⚠ BEHAVIORAL TRAP DETECTED</span>
      <p className={styles.trapText}>{archetype.trap}</p>
    </div>
  );
}

function SectionRules({ archetype }) {
  return (
    <div className={styles.rulesGrid}>
      {archetype.rules.map((rule) => (
        <div key={rule.n} className={styles.ruleCard}>
          <span className={styles.ruleN}>RULE {rule.n}</span>
          <p className={styles.ruleText}>{rule.text}</p>
        </div>
      ))}
    </div>
  );
}

function SectionExplainer({ archetypeKey }) {
  const cards = EXPLAINER_DATA[archetypeKey] ?? [];
  return (
    <div className={styles.explainerGrid}>
      {cards.map((card, i) => (
        <div key={i} className={styles.explainerCard}>
          <span className={styles.explainerIcon}>{card.icon}</span>
          <span className={styles.explainerTitle}>{card.title}</span>
          <p className={styles.explainerBody}>{card.body}</p>
        </div>
      ))}
    </div>
  );
}

function SectionStats({ archetypeKey }) {
  const stats = STATS_DATA[archetypeKey] ?? [];
  return (
    <div className={styles.statsGrid}>
      {stats.map((stat, i) => (
        <StatCard key={i} stat={stat} />
      ))}
    </div>
  );
}

