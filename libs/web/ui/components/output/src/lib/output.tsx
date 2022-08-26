import { useId } from 'react';
import styles from './output.module.css';

type OutputProps = {
  label: string;
  value: React.ReactNode;
  ariaValue?: string | number;
};

export function Output({ label, value, ariaValue }: OutputProps) {
  const id = useId();
  return (
    <>
      <label htmlFor={id} className={styles['label']}>
        {label}
      </label>
      <output id={id} className={styles['output']}>
        <span aria-hidden>{value}</span>
        <span className={styles['aria-value']}>{ariaValue || ''}</span>
      </output>
    </>
  );
}
