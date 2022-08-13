import styles from './counter-up.module.css';
import { useEffect, useState } from 'react';
import { Output } from '../output/output';

type CounterUpProps = {
  from: number;
  to: number;
  title: string;
  spead?: number;
};

export function CounterUp({ from, to, spead = 1, title }: CounterUpProps) {
  const [value, setValue] = useState(from);
  useEffect(() => {
    const id = setTimeout(() => {
      console.log('timer');
      if (value < to) {
        setValue((c) => {
          const val = c + spead;
          return val < to ? val : to;
        });
      } else if (value > to) {
        setValue(from);
      }
    }, 10);

    return () => clearTimeout(id);
  });
  return (
    <div className={styles['container']}>
      <Output title={title} value={value} />
    </div>
  );
}
