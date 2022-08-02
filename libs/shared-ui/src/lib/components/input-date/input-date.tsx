import { ChangeEvent } from 'react';
import styles from './input-date.module.css';

export interface InputDateProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function InputDate({
  label,
  value,
  onChange,
  ...props
}: InputDateProps) {
  return (
    <div className={styles['container']}>
      <label className={styles['label']} htmlFor={label}>
        {label}
      </label>
      <input
        className={styles['input']}
        type="date"
        id={label}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

export default InputDate;
