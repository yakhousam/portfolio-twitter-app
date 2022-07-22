import { useEffect, useState } from 'react';
import styles from './info.module.css';

export interface InfoProps {
  title: string;
  highValue: number;
  lowValue: number;
  countDownDirection?: 'up' | 'down';
  spead?: number;
  animate?: boolean;
}

export function Info({
  title,
  highValue,
  lowValue,
  countDownDirection = 'up',
  spead = 1,
  animate = true,
}: InfoProps) {
  const [value, setValue] = useState(
    countDownDirection === 'up' ? lowValue : highValue
  );
  useEffect(() => {
    if (!animate) return;
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
      <p className={styles['text']}>{animate ? value : highValue}</p>
    </div>
  );
}

export default Info;
