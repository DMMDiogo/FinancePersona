import { useEffect, useState } from 'react';
import { fetchEtfData } from '../utils/fetchEtfData';
import styles from './EtfLiveBadge.module.css';

export default function EtfLiveBadge({ ticker }) {
  const [state, setState] = useState('loading'); // 'loading' | 'data' | 'hidden'
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchEtfData(ticker).then((result) => {
      if (cancelled) return;
      if (result) {
        setData(result);
        setState('data');
      } else {
        setState('hidden');
      }
    });
    return () => { cancelled = true; };
  }, [ticker]);

  if (state === 'hidden') return null;

  if (state === 'loading') {
    return <div className={styles.skeleton} />;
  }

  const { price, currencySymbol, dayChange, yearReturn } = data;
  const dayChangePos = dayChange != null && dayChange >= 0;
  const yearReturnPos = yearReturn != null && yearReturn >= 0;

  return (
    <div className={styles.badge}>
      <span className={styles.price}>
        {currencySymbol}{price.toFixed(2)}
      </span>
      {dayChange != null && (
        <>
          <span className={styles.sep}>·</span>
          <span className={dayChangePos ? styles.positive : styles.negative}>
            {dayChangePos ? '+' : ''}{dayChange.toFixed(2)}% today
          </span>
        </>
      )}
      {yearReturn != null && (
        <>
          <span className={styles.sep}>·</span>
          <span className={yearReturnPos ? styles.positive : styles.negative}>
            {yearReturnPos ? '+' : ''}{yearReturn.toFixed(1)}% 1yr
          </span>
        </>
      )}
      <span className={styles.sep}>·</span>
      <span className={styles.liveDot}>◉ LIVE</span>
    </div>
  );
}
