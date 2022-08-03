import styles from './input-search.module.css';
import { MdTag } from 'react-icons/md';
import { ChangeEventHandler } from 'react';

/* eslint-disable-next-line */
export interface InputSearchProps {
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

export function InputSearch({
  value,
  handleChange,
  ...props
}: InputSearchProps) {
  return (
    <div className={styles['container']}>
      <input
        className={styles['input']}
        type="search"
        placeholder="hashtag"
        value={value}
        onChange={handleChange}
        {...props}
      />
      <MdTag className={styles['icon']} />
    </div>
  );
}

export default InputSearch;
