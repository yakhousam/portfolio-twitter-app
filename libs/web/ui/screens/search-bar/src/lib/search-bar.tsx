import styles from './search-bar.module.css';
import { useSearchHashtag } from '@yak-twitter-app/hooks/use-search-hashtag';
import React, { useState } from 'react';
import { useAppDispatch } from '@yak-twitter-app/context/use-app-data';
import { SearchOptions } from './search-options/search-options';
import { InputSearch } from '@yak-twitter-app/web-ui-components-input-search';
import { BtnSearch } from '@yak-twitter-app/web-ui-components-btn-search';
import { clsx, isValidJSON } from '@yak-twitter-app/utility/helpers';
import { HeadersSentErrorMessaage } from '@yak-twitter-app/types';

const headersSentErrorMessaage: HeadersSentErrorMessaage = {
  error_streaming: true,
};

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
        if (isValidJSON(chunk)) {
          if (
            chunk === JSON.stringify(headersSentErrorMessaage) ||
            'status' in JSON.parse(chunk)
          ) {
            return appDispatch({ type: 'search_error' });
          }
          appDispatch({ type: 'update_data', data: JSON.parse(chunk) });
        } else if (isValidJSON(chunks + chunk)) {
          appDispatch({
            type: 'update_data',
            data: JSON.parse(chunks + chunk),
          });
        } else {
          chunks += chunk;
        }
      }
    } catch (error) {
      console.error(error);
      if (error instanceof DOMException) {
        console.log(error.message);
        appDispatch({ type: 'search_cancelled' });
      } else {
        appDispatch({ type: 'search_error' });
      }
    }
  };

  const handleCancelSearch = () => {
    appDispatch({ type: 'search_is_cancelling' });
    cancelSearch();
  };

  const clearError = () => setError(false);

  return (
    <div className={styles['container']}>
      <form className={styles['form']} onSubmit={(e) => e.preventDefault()}>
        <div className={styles['wrapper-search']}>
          <InputSearch error={error} clearError={clearError} />
          <BtnSearch
            handleCancelSearch={handleCancelSearch}
            handleSubmit={handleSubmit}
          />
        </div>
        <SearchOptions />
      </form>
      <div
        id="search-input-error"
        className={clsx(styles['error-container'], styles['error-message'])}
        aria-live="assertive"
      >
        {error ? "error search input can't be empty" : ''}
      </div>
    </div>
  );
});
