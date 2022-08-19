import { useSearchHashtag } from '@yak-twitter-app/shared-lib';
import React, { useState } from 'react';

import BtnSearch from '../../components/btn-search/btn-search';

import InputSearch from '../../components/input-search/input-search';
import { useAppData } from '../../context/use-app-data/use-app-data';
import { SearchOptions } from '../search-options/search-options';

import styles from './search-bar.module.css';

export const SearchBar = React.memo(() => {
  const { cancelSearch, searchHashtag } = useSearchHashtag();
  const { dispatch: appDataDispatch } = useAppData();
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const { form } = e.currentTarget;
      if (!form) {
        return;
      }

      const formData = new FormData(form);
      const { hashtag, startDate, endDate } = Object.fromEntries(
        formData.entries()
      );

      if (!hashtag) {
        return setError(true);
      }
      appDataDispatch({ type: 'search_start' });
      const reader = await searchHashtag({
        hashtag: hashtag.toString(),
        startDate: startDate.toString(),
        endDate: endDate.toString(),
      });
      let chunks = '';
      while (reader) {
        const { value, done } = await reader.read();
        if (done) {
          appDataDispatch({ type: 'search_end_success' });
          break;
        }
        const chunk = new TextDecoder().decode(value);
        if (chunk.endsWith('}]}')) {
          appDataDispatch({
            type: 'update_data',
            data: await JSON.parse(chunks + chunk),
          });
          chunks = '';
        } else {
          chunks += chunk;
        }
      }
    } catch (error) {
      if (error instanceof DOMException) {
        console.log(error.message);
        appDataDispatch({ type: 'search_cancelled' });
      } else {
        appDataDispatch({ type: 'search_error' });
      }
    }
  };

  const clearError = () => setError(false);

  return (
    <form className={styles['container']} onSubmit={(e) => e.preventDefault()}>
      <div className={styles['wrapper-search']}>
        <InputSearch error={error} clearError={clearError} />
        <BtnSearch
          handleCancelSearch={cancelSearch}
          handleSubmit={handleSubmit}
        />
      </div>
      <SearchOptions />
    </form>
  );
});
