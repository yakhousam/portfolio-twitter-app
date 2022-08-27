import styles from './counter-up.module.css';
import { useEffect, useState } from 'react';
import { Output } from '@yak-twitter-app/web-ui-components-output';

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
      <Output label={title} value={value} />
    </div>
  );
}
