import { useEffect, useState } from 'react';
import styles from './info.module.css';

export interface InfoProps {
  title: string;
  highValue: number;
  lowValue: number;
  countDownDirection?: 'up' | 'down';
  spead?: number;
}

export function Info({
  title,
  highValue,
  lowValue,
  countDownDirection = 'up',
  spead = 1,
}: InfoProps) {
  const [value, setValue] = useState(
    countDownDirection === 'up' ? lowValue : highValue
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      if (countDownDirection === 'up' && value < highValue) {
        setValue((c) => {
          const val = c + spead;
          return val < highValue ? val : highValue;
        });
      } else if (countDownDirection === 'down' && value > lowValue) {
        setValue((c) => {
          const val = c - spead;
          return val > lowValue ? val : lowValue;
        });
      }
    }, 10);
    return () => clearTimeout(timer);
  });

  return (
    <div className={styles['container']}>
      <h2 className={styles['title']}>{title}</h2>
      <p className={styles['text']}>{value}</p>
    </div>
  );
}

export default Info;
