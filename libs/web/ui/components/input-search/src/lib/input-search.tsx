import styles from './input-search.module.css';
import { MdTag } from 'react-icons/md';
import { clsx } from '@yak-twitter-app/utility/helpers';
import React, { useId, useState } from 'react';

export interface InputSearchProps {
  error: boolean;
  clearError: () => void;
}

export function InputSearch({ error, clearError }: InputSearchProps) {
  const [value, setValue] = useState('');
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError();
    setValue(e.currentTarget.value);
  };
  return (
    <div className={styles['container']}>
      <label htmlFor={id} className={styles['label']}>
        search hashtag
      </label>

      <input
        id={id}
        className={clsx(styles['input'], error ? styles['error'] : '')}
        type="search"
        placeholder="hashtag"
        name="hashtag"
        value={value}
        onChange={handleChange}
        aria-required={true}
        aria-invalid={error}
        aria-describedby="search-input-error"
        autoComplete="off"
      />

      <MdTag className={styles['icon']} />
    </div>
  );
}

export default InputSearch;
