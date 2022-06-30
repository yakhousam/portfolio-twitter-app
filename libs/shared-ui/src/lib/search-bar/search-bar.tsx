import BtnSearch from '../btn-search/btn-search';
import InputDate from '../input-date/input-date';
import InputMaxResult from '../input-max-result/input-max-result';
import InputSearch from '../input-search/input-search';
import styles from './search-bar.module.css';

/* eslint-disable-next-line */
export interface SearchBarProps {}

export function SearchBar(props: SearchBarProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['wrapper-search']}>
        <InputSearch />
        <BtnSearch size="small" handleClick={() => console.log('clicked')} />
      </div>
      <div className={styles['wrapper-options']}>
        <InputMaxResult />
        <InputDate label="start date" />
        <InputDate label="end date" />
      </div>
    </div>
  );
}

export default SearchBar;
