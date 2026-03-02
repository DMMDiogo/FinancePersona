import styles from './ProgressBar.module.css';

export default function ProgressBar({ current, total }) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className={styles.bar} role="progressbar" aria-valuenow={current} aria-valuemax={total}>
      <div className={styles.fill} style={{ width: `${pct}%` }} />
    </div>
  );
}
