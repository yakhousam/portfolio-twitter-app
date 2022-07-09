import { ChangeEvent, useState } from 'react';
import styles from './input-max-result.module.css';

/* eslint-disable-next-line */
export interface InputMaxResultProps {}

export function InputMaxResult(props: InputMaxResultProps) {
  const [value, setValue] = useState('1000');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  return (
    <div className={styles['container']}>
      <label className={styles['label']} htmlFor="max-result">
        max result
      </label>
      <input
        className={styles['input']}
        id="max-result"
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default InputMaxResult;
