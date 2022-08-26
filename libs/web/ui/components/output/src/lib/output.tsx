import { clsx } from '@yak-twitter-app/utility/helpers';
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
        <span aria-hidden={ariaValue !== undefined ? true : undefined}>
          {value}
        </span>
        <span
          className={clsx(
            styles['aria-value'],
            ariaValue === undefined ? styles['hidden'] : ''
          )}
        >
          {ariaValue || ''}
        </span>
      </output>
    </>
  );
}
