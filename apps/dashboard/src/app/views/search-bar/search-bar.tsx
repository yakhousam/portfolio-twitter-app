import { SearchHashtagReturnData } from '@yak-twitter-app/shared-lib';
import {
  BtnSearch,
  InputDate,
  InputMaxResult,
  InputSearch,
} from '@yak-twitter-app/shared-ui';
import { ChangeEventHandler, Dispatch, useState } from 'react';
import { getData } from '../../api';
import { ActionType } from '../../app';

import styles from './search-bar.module.css';

export interface SearchBarProps {
  dispatch: Dispatch<ActionType>;
}

export function SearchBar({ dispatch }: SearchBarProps) {
  const [hashtag, setHashtag] = useState('node');
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setHashtag(e.target.value);
  };
  // const abortControllerRef = useRef()
  // useEffect(()=>{
  //   abortControllerRef.current = new AbortController()
  // }, [])

  const handleSearch = () => {
    getData(hashtag, dispatch);
  };
  return (
    <div className={styles['container']}>
      <div className={styles['wrapper-search']}>
        <InputSearch inputValue={hashtag} handleChange={handleChange} />
        <div className={styles['btn-search-mobile']}>
          <BtnSearch size="small" handleClick={handleSearch} />
        </div>
      </div>
      <div className={styles['wrapper-options']}>
        <InputMaxResult />
        <InputDate label="start date" />
        <InputDate label="end date" />
        <div className={styles['btn-search-desktop']}>
          <BtnSearch size="large" handleClick={handleSearch} />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
