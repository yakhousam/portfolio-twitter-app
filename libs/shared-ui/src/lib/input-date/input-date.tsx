import styles from './input-date.module.css';

export interface InputDateProps {
  label: string;
}

export function InputDate({ label = '' }: InputDateProps) {
  return (
    <div className={styles['container']}>
      <label className={styles['label']} htmlFor={label}>
        {label}
      </label>
      <input
        className={styles['input']}
        type="date"
        id={label}
        defaultValue="2022-05-30"
      />
    </div>
  );
}

export default InputDate;
