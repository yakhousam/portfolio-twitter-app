import { ChangeEvent, useId } from 'react';
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
  const id = useId();
  return (
    <div className={styles['container']}>
      <label className={styles['label']} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={styles['input']}
        type="date"
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

export default InputDate;
