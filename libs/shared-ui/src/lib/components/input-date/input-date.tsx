import { ChangeEvent } from 'react';
import styles from './input-date.module.css';

export interface InputDateProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function InputDate({
  label,
  value,
  onChange,
  name,
  ...props
}: InputDateProps) {
  return (
    <div className={styles['container']}>
      <label className={styles['label']} htmlFor={label}>
        {label}
      </label>
      <input
        {...props}
        className={styles['input']}
        name={name}
        type="date"
        id={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputDate;
