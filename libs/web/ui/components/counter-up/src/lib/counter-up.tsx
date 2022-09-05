import styles from './counter-up.module.css';
import { useEffect, useId, useState } from 'react';

type CounterUpProps = {
  from: number;
  to: number;
  label: string;
  spead?: number;
};

export function CounterUp({ from, to, spead = 1, label }: CounterUpProps) {
  const [value, setValue] = useState(from);
  const id = useId();
  useEffect(() => {
    const id = setTimeout(() => {
      if (value < to) {
        setValue((c) => {
          const val = c + spead;
          return val < to ? val : to;
        });
      }
    }, 10);

    return () => clearTimeout(id);
  });
  return (
    <div className={styles['container']}>
      <label htmlFor={id} className={styles['label']}>
        {label}
      </label>
      <output id={id} className={styles['output']}>
        <span data-testid={`${label}-value`} aria-hidden>
          {value}
        </span>
        <span
          data-testid={`${label}-aria-value`}
          className={styles['aria-value']}
        >
          {to}
        </span>
      </output>
    </div>
  );
}
