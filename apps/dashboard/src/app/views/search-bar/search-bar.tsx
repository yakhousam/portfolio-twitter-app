import { SearchHashtagReturnData } from '@yak-twitter-app/shared-lib';
import {
  BtnSearch,
  InputDate,
  InputMaxResult,
  InputSearch,
} from '@yak-twitter-app/shared-ui';
import { ChangeEventHandler, useState } from 'react';
import { searchHashtag } from '../../api';

import styles from './search-bar.module.css';

export interface SearchBarProps {
  handleUpdateData: (data: SearchHashtagReturnData | null) => void;
}

export function SearchBar({ handleUpdateData }: SearchBarProps) {
  const [hashtag, setHashtag] = useState('node');
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setHashtag(e.target.value);
  };
  // const abortControllerRef = useRef()
  // useEffect(()=>{
  //   abortControllerRef.current = new AbortController()
  // }, [])
  async function getData(hashtag: string) {
    try {
      handleUpdateData(null);
      const controller = new AbortController();
      const { signal } = controller;
      console.log({ signal });
      const reader = await searchHashtag(hashtag, signal);
      while (true && reader) {
        // eslint-disable-next-line no-await-in-loop
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const tweets = new TextDecoder().decode(value);

        console.log('received value=', JSON.parse(tweets));
        handleUpdateData(JSON.parse(tweets));
      }
      console.log('Response fully received');
    } catch (error) {
      console.error(error);
    }
  }
  const handleSearch = () => {
    getData(hashtag);
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
