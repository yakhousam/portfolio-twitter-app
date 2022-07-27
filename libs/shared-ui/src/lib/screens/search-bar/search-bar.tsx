import { ActionType, getData, State } from '@yak-twitter-app/shared-lib';

import {
  ChangeEventHandler,
  Dispatch,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MdSearch } from 'react-icons/md';
import BtnSearch from '../../components/btn-search/btn-search';
import InputDate from '../../components/input-date/input-date';
import InputMaxResult from '../../components/input-max-result/input-max-result';
import InputSearch from '../../components/input-search/input-search';

import styles from './search-bar.module.css';

export interface SearchBarProps {
  dispatch: Dispatch<ActionType>;
  status: State['status'];
}

export function SearchBar({ dispatch, status }: SearchBarProps) {
  const [hashtag, setHashtag] = useState('node');
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setHashtag(e.target.value);
  };
  const abortControllerRef = useRef<AbortController>();
  useEffect(() => {
    function cancelFetch(e: BeforeUnloadEvent) {
      abortControllerRef.current?.abort();
    }
    window.addEventListener('beforeunload', cancelFetch);
    return () => window.removeEventListener('beforeunload', cancelFetch);
  }, []);

  const handleSearch = () => {
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;
    console.log({ signal });
    getData(hashtag, dispatch, signal);
  };
  const handleCancel = () => {
    console.log('handle cancel..............');
    abortControllerRef.current?.abort();
    dispatch({ type: 'search_cancel' });
  };
  const isFetching = status === 'pending' || status === 'receiving';
  return (
    <div className={styles['container']}>
      <div className={styles['wrapper-search']}>
        <InputSearch inputValue={hashtag} handleChange={handleChange} />
        <div className={styles['btn-search-mobile']}>
          <BtnSearch
            size="small"
            handleClick={isFetching ? handleCancel : handleSearch}
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
            handleClick={isFetching ? handleCancel : handleSearch}
          >
            {isFetching ? 'CANCEL' : <MdSearch className={styles['icon']} />}
          </BtnSearch>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
