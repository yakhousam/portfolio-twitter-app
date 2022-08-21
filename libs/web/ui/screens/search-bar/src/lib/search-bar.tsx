import styles from './search-bar.module.css';
import { useSearchHashtag } from '@yak-twitter-app/shared-lib';
import React, { useState } from 'react';
import { useAppDispatch } from '@yak-twitter-app/context/use-app-data';
import { BtnSearch, InputSearch } from '@yak-twitter-app/web/ui/components';
import { SearchOptions } from './search-options/search-options';

export const SearchBar = React.memo(() => {
  console.log('searchbar.............');
  const { cancelSearch, searchHashtag } = useSearchHashtag();
  const appDispatch = useAppDispatch();
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
      appDispatch({ type: 'search_start' });
      const reader = await searchHashtag({
        hashtag: hashtag.toString(),
        startDate: startDate.toString(),
        endDate: endDate.toString(),
      });
      let chunks = '';
      while (reader) {
        const { value, done } = await reader.read();
        if (done) {
          appDispatch({ type: 'search_end_success' });
          break;
        }
        const chunk = new TextDecoder().decode(value);
        if (chunk.endsWith('}]}')) {
          appDispatch({
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
        appDispatch({ type: 'search_cancelled' });
      } else {
        appDispatch({ type: 'search_error' });
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
