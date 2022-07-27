import { ChangeEventHandler, memo, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import BtnSearch from '../../components/btn-search/btn-search';
import InputDate from '../../components/input-date/input-date';
import InputMaxResult from '../../components/input-max-result/input-max-result';
import InputSearch from '../../components/input-search/input-search';

import styles from './search-bar.module.css';

export interface SearchBarProps {
  handleSearch: (hashtag: string) => void;
  handleCancle: () => void;
  isFetching: boolean;
}

export const SearchBar = memo(
  function SearchBar({
    handleCancle,
    handleSearch,
    isFetching,
  }: SearchBarProps) {
    const [hashtag, setHashtag] = useState('node');
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setHashtag(e.target.value);
    };

    return (
      <div className={styles['container']}>
        <div className={styles['wrapper-search']}>
          <InputSearch inputValue={hashtag} handleChange={handleChange} />
          <div className={styles['btn-search-mobile']}>
            <BtnSearch
              size="small"
              handleClick={
                isFetching ? handleCancle : () => handleSearch(hashtag)
              }
            >
              {isFetching ? 'CANCEL' : <MdSearch className={styles['icon']} />}
            </BtnSearch>
          </div>
        </div>
        <div className={styles['wrapper-options']}>
          <InputMaxResult />
          <InputDate label="start date" />
          <InputDate label="end date" />
          <div className={styles['btn-search-desktop']}>
            <BtnSearch
              size="large"
              handleClick={
                isFetching ? handleCancle : () => handleSearch(hashtag)
              }
            >
              {isFetching ? 'CANCEL' : <MdSearch className={styles['icon']} />}
            </BtnSearch>
          </div>
        </div>
      </div>
    );
  },
  (prevprops, nextprops) => prevprops.isFetching === nextprops.isFetching
);

export default SearchBar;
