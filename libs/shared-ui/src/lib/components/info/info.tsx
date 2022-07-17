import { useEffect, useState } from 'react';
import styles from './info.module.css';

export interface InfoProps {
  title: string;
  highValue: number;
  lowValue: number;
  countDownDirection?: 'up' | 'down';
}

export function Info({
  title,
  highValue,
  lowValue,
  countDownDirection = 'up',
}: InfoProps) {
  const [value, setValue] = useState(
    countDownDirection === 'up' ? lowValue : highValue
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      if (countDownDirection === 'up' && value < highValue) {
        setValue((c) => c + 1);
      } else if (countDownDirection === 'down' && value > lowValue) {
        setValue((c) => c - 1);
      }
    }, 10);
    return () => clearTimeout(timer);
  }, [value, countDownDirection, highValue, lowValue]);

  return (
    <div className={styles['container']}>
      <h2 className={styles['title']}>{title}</h2>
      <p className={styles['text']}>{value}</p>
    </div>
  );
}

export default Info;
