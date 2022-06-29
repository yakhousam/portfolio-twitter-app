import styles from './input-search.module.css';

/* eslint-disable-next-line */
export interface InputSearchProps {}

export function InputSearch(props: InputSearchProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to InputSearch!</h1>
    </div>
  );
}

export default InputSearch;
