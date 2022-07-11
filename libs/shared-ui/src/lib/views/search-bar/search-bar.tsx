import BtnSearch from '../../components/btn-search/btn-search';
import InputDate from '../../components/input-date/input-date';
import InputMaxResult from '../../components/input-max-result/input-max-result';
import InputSearch from '../../components/input-search/input-search';
import styles from './search-bar.module.css';

/* eslint-disable-next-line */
export interface SearchBarProps {}

export function SearchBar(props: SearchBarProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['wrapper-search']}>
        <InputSearch />
        <div className={styles['btn-search-mobile']}>
          <BtnSearch size="small" handleClick={() => console.log('clicked')} />
        </div>
      </div>
      <div className={styles['wrapper-options']}>
        <InputMaxResult />
        <InputDate label="start date" />
        <InputDate label="end date" />
        <div className={styles['btn-search-desktop']}>
          <BtnSearch size="large" handleClick={() => console.log('clicked')} />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
