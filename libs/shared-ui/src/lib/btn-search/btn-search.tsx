import styles from './btn-search.module.css';

/* eslint-disable-next-line */
export interface BtnSearchProps {}

export function BtnSearch(props: BtnSearchProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to BtnSearch!</h1>
    </div>
  );
}

export default BtnSearch;
