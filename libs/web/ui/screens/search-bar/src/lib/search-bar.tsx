import styles from './search-bar.module.css';
import React, { useRef, useState } from 'react';
import { useAppDispatch } from '@yak-twitter-app/context/use-app-data';
import { SearchOptions } from './search-options/search-options';
import { InputSearch } from '@yak-twitter-app/web-ui-components-input-search';
import { BtnSearch } from '@yak-twitter-app/web-ui-components-btn-search';
import { clsx } from '@yak-twitter-app/utility/helpers';
import { SearchHashtagReturnData } from '@yak-twitter-app/types';

function getEndTime(d: Date) {
  const today = new Date();
  if (d.getDate() === today.getDate()) {
    d.setHours(today.getHours());
    d.setMinutes(today.getMinutes());
    d.setSeconds(today.getSeconds() - 30);
  } else {
    d.setHours(23);
    d.setMinutes(59);
  }
  return d;
}

export function SearchBar() {
  console.log('searchbar.............');
  // const { cancelSearch, searchHashtag } = useSearchHashtag();
  const appDispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const cancelSearch = useRef(false);
  console.log({ cancelSearch: cancelSearch.current });
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('handleSubmit....................');
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
      cancelSearch.current = false;

      let nextPage = undefined;
      do {
        const response = await fetch(
          `api/search/hashtag/${hashtag}?startTime=${new Date(
            startDate.toString()
          ).toISOString()}&endTime=${getEndTime(
            new Date(endDate.toString())
          ).toISOString()}&nextToken=${nextPage || ''}`
        );

        if (response.ok) {
          const result: SearchHashtagReturnData = await response.json();
          const { nextToken, ...data } = result;
          nextPage = nextToken;
          appDispatch({ type: 'update_data', data });
        } else if (response.status < 500) {
          const err = await response.json();
          return appDispatch({ type: 'search_error', error: err });
        } else {
          console.log('I am here..............................');
          const message = await response.text();
          return appDispatch({
            type: 'search_error',
            error: { status: response.status, message },
          });
        }
        console.log('while condition =', nextPage && !cancelSearch.current);
      } while (nextPage && !cancelSearch.current);
      if (cancelSearch.current) {
        appDispatch({ type: 'search_cancelled' });
      } else {
        appDispatch({ type: 'search_end_success' });
      }
    } catch (error) {
      appDispatch({
        type: 'search_error',
        error: String(error),
      });
    }
  };

  const handleCancelSearch = () => {
    appDispatch({ type: 'search_is_cancelling' });
    cancelSearch.current = true;
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
}
