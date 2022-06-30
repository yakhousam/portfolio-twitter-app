import styles from './input-search.module.css';
import { MdTag } from 'react-icons/md';

/* eslint-disable-next-line */
export interface InputSearchProps {}

export function InputSearch(props: InputSearchProps) {
  return (
    <div className={styles['container']}>
      <input className={styles['input']} type="search" placeholder="hashtag" />
      <MdTag className={styles['icon']} />
    </div>
  );
}

export default InputSearch;
