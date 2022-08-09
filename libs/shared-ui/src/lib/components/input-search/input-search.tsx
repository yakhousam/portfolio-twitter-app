import styles from './input-search.module.css';
import { MdTag } from 'react-icons/md';
import { clsx } from '@yak-twitter-app/shared-lib';

export interface InputSearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  error: boolean;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function InputSearch({
  value = '',
  handleChange,
  error,
}: InputSearchProps) {
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
        value={value}
        onChange={handleChange}
        aria-describedby={error ? 'msg-err' : undefined}
      />

      <MdTag className={styles['icon']} />
    </div>
  );
}

export default InputSearch;
