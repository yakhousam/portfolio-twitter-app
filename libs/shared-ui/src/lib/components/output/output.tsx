import { useId } from 'react';
import styles from './output.module.css';

type OutputProps = {
  title: string;
  value: number | string;
};

export function Output({ title, value }: OutputProps) {
  const id = useId();
  return (
    <>
      <label htmlFor={id} className={styles['title']}>
        {title}
      </label>
      <output id={id} className={styles['output']}>
        {value}
      </output>
    </>
  );
}
