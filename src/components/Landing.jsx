import styles from './Landing.module.css';

export default function Landing({ onBegin }) {
  return (
    <main className={styles.landing}>
      <p className={styles.logo}>INVEST — PERSONA</p>

      <h1 className={styles.headline}>
        You work hard<br />
        for your money.<br />
        <span className={styles.cyan}>Does it work<br />hard for you?</span>
      </h1>

      <p className={styles.subline}>
        Most people invest wrong. Not because of bad picks —<br />
        because they don't know themselves.<br />
        10 questions. 5 minutes. One honest answer.
      </p>

      <button className={styles.cta} onClick={onBegin} type="button">
        BEGIN →
      </button>
    </main>
  );
}
