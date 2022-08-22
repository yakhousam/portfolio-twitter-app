import styles from './input-search.module.css';
import { MdTag } from 'react-icons/md';
import { clsx } from '@yak-twitter-app/utility/helpers';
import React, { useState } from 'react';

export interface InputSearchProps {
  error: boolean;
  clearError: () => void;
}

export function InputSearch({ error, clearError }: InputSearchProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError();
    setValue(e.currentTarget.value);
  };
  return (
    <div className={styles['container']}>
      <div className={styles['label-wrapper']}>
        <label htmlFor="search" className={styles['label']}>
          search hashtag
        </label>
        {error && (
          <span id="msg-err" className={styles['error-message']}>
            error: search input can't be empty
          </span>
        )}
      </div>
      <input
        id="search"
        className={clsx(styles['input'], error ? styles['error'] : '')}
        type="search"
        placeholder="hashtag"
        name="hashtag"
        value={value}
        onChange={handleChange}
        aria-describedby={error ? 'msg-err' : undefined}
      />

      <MdTag className={styles['icon']} />
    </div>
  );
}

export default InputSearch;
