import { useId } from 'react';
import styles from './output.module.css';

type OutputProps = {
  label: string;
  value: React.ReactNode;
};

export function Output({ label, value }: OutputProps) {
  const id = useId();
  return (
    <>
      <label htmlFor={id} className={styles['label']}>
        {label}
      </label>
      <output id={id} className={styles['output']}>
        {value}
      </output>
    </>
  );
}
