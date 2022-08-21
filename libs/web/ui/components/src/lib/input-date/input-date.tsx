import { useId } from 'react';
import styles from './input-date.module.css';

export interface InputDateProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
