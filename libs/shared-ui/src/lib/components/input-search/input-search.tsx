import styles from './input-search.module.css';
import { MdTag } from 'react-icons/md';
import { ChangeEventHandler } from 'react';

/* eslint-disable-next-line */
export interface InputSearchProps {
  inputValue: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

export function InputSearch({ inputValue, handleChange }: InputSearchProps) {
  return (
    <div className={styles['container']}>
      <input
        className={styles['input']}
        type="search"
        placeholder="hashtag"
        value={inputValue}
        onChange={handleChange}
      />
      <MdTag className={styles['icon']} />
    </div>
  );
}

export default InputSearch;
