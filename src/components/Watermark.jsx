import styles from './Watermark.module.css';

export default function Watermark() {
  return (
    <p className={styles.watermark}>
      ⚠ For educational purposes only. Not financial advice. All investments carry risk.
    </p>
  );
}
