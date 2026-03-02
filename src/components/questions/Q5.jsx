import { useState, useEffect, useRef } from 'react';
import styles from './Q5.module.css';

const FEEDBACKS = {
  fomo:    { text: "FOMO DETECTED. You're in the 71% who act on tips from people they trust. Markets are built on this impulse.", color: 'gold' },
  cautious:{ text: "CAUTION MODE. You'll research it. You'll probably find three reasons it's a good idea.", color: 'muted' },
  pass:    { text: "DISCIPLINE. Harder than it looks when it's someone you know and the number sounds real.", color: 'cyan' },
  froze:   { text: "ANALYSIS FREEZE. When uncertain, you don't act. That can be a superpower. Or a trap.", color: 'muted' },
};

const REPLIES = [
  { key: 'fomo',    label: 'Send me the link 👀',  colorClass: 'gold' },
  { key: 'cautious',label: "I'll look into it",     colorClass: 'muted' },
  { key: 'pass',    label: "Thanks, I'll pass",     colorClass: 'cyan' },
];

export default function Q5({ onAutoAdvance, step, total }) {
  const [phase, setPhase] = useState('incoming'); // incoming | prompt | deciding | feedback
  const [countdown, setCountdown] = useState(10);
  const [choice, setChoice] = useState(null);
  const [frozeFlash, setFrozeFlash] = useState(false);
  const timerRef = useRef(null);
  const pad = (n) => String(n).padStart(2, '0');

  // Marco's message slides in, then prompt appears
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('prompt'), 1400);
    const t2 = setTimeout(() => setPhase('deciding'), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Countdown
  useEffect(() => {
    if (phase !== 'deciding') return;
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timerRef.current);
          setChoice('froze');
          setPhase('feedback');
          setFrozeFlash(true);
          setTimeout(() => { setFrozeFlash(false); onAutoAdvance('froze'); }, 1500);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const commit = (val) => {
    if (choice) return;
    clearInterval(timerRef.current);
    setChoice(val);
    setPhase('feedback');
    setTimeout(() => onAutoAdvance(val), 2500);
  };

  const handleReply = (key) => {
    if (phase !== 'deciding' || choice) return;
    commit(key);
  };

  return (
    <div className={styles.wrapper}>
      {/* meta */}
      <div className={styles.meta}>
        <span className={styles.counter}>{pad(step + 1)}/{pad(total)}</span>
        <span className={styles.labelTag}>◈ SOCIAL PRESSURE TEST</span>
      </div>

      {/* chat window */}
      <div className={styles.chatWindow}>
        {/* chat header */}
        <div className={styles.chatHeader}>
          <div className={styles.chatAvatar}>📈</div>
          <div className={styles.chatHeaderInfo}>
            <span className={styles.chatName}>Marco</span>
            <span className={styles.chatStatus}>Active now</span>
          </div>
          <span className={styles.chatIcon}>⋯</span>
        </div>

        {/* messages area */}
        <div className={styles.messages}>

          {/* Marco's incoming message */}
          <div className={styles.incomingRow}>
            <div className={styles.incomingAvatar}>M</div>
            <div className={styles.incomingBubble}>
              bro seriously. get into $NVDA calls before Thursday.
              made €11k last month. not too late trust me 🚀🚀
            </div>
          </div>
          <span className={styles.incomingMeta}>Marco · now</span>

          {/* System prompt */}
          {(phase === 'prompt' || phase === 'deciding' || phase === 'feedback') && (
            <div className={styles.systemLine}>
              <span className={styles.systemText}>You have 10 seconds. What do you do?</span>
            </div>
          )}

          {/* Reply bubbles */}
          {(phase === 'deciding' || phase === 'feedback') && (
            <div className={styles.replies}>
              {REPLIES.map((r, i) => {
                const isChosen = choice === r.key;
                const isOther = choice && choice !== r.key;
                return (
                  <button
                    key={r.key}
                    className={`
                      ${styles.replyBubble}
                      ${styles[`reply_${r.colorClass}`]}
                      ${isChosen ? styles.replyChosen : ''}
                      ${isOther ? styles.replyFaded : ''}
                    `}
                    onClick={() => handleReply(r.key)}
                    type="button"
                    style={{ animationDelay: `${i * 0.12}s` }}
                    disabled={!!choice}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Froze flash */}
          {frozeFlash && (
            <p className={styles.frozeText}>Time's up — your gut froze</p>
          )}

          {/* Feedback text */}
          {phase === 'feedback' && choice && (
            <div className={styles.feedbackRow}>
              <p className={styles.feedbackText} data-color={FEEDBACKS[choice].color}>
                {FEEDBACKS[choice].text}
              </p>
            </div>
          )}
        </div>

        {/* Countdown + input bar */}
        {phase === 'deciding' && (
          <div className={styles.inputBar}>
            <span className={styles.inputHint}>Reply as yourself...</span>
            <span className={styles.countdown}>{countdown}</span>
          </div>
        )}
      </div>
    </div>
  );
}
