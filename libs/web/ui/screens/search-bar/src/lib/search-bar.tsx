import styles from './search-bar.module.css';
import React, { useRef, useState } from 'react';
import { useAppDispatch } from '@yak-twitter-app/context/use-app-data';
import { SearchOptions } from './search-options/search-options';
import { InputSearch } from '@yak-twitter-app/web-ui-components-input-search';
import { BtnSearch } from '@yak-twitter-app/web-ui-components-btn-search';
import { clsx, sleep } from '@yak-twitter-app/utility/helpers';
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

function isValidApiResponse(
  data: SearchHashtagReturnData
): data is SearchHashtagReturnData {
  return (
    'chartData' in data &&
    'mostEngagedTweets' in data &&
    'original' in data &&
    'rankedAccounts' in data &&
    'rateLimit' in data &&
    'replay' in data &&
    'retweet' in data
  );
}
export function SearchBar() {
  console.log('searchbar.............');
  const appDispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const cancelSearch = useRef(false);
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
      appDispatch({ type: 'search_start', hashtag: hashtag.toString() });
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
        if (!response.ok) {
          return response.status === 404
            ? appDispatch({
                type: 'search_not_found',
              })
            : appDispatch({
                type: 'search_error',
                error: {
                  status: response.status,
                  message: response.statusText,
                },
              });
        }
        const result: SearchHashtagReturnData = await response.json();
        if (!isValidApiResponse(result)) {
          throw new Error('api error - invalid data returned');
        }
        const { nextToken, ...data } = result;
        nextPage = nextToken;
        appDispatch({ type: 'update_data', data });
        if (result.rateLimit.remaining === 0) {
          const sleeptime = result.rateLimit.reset - Date.now();
          await sleep(sleeptime);
        }
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
          <div
            id="search-input-error"
            className={clsx(styles['error-container'], styles['error-message'])}
            aria-live="assertive"
          >
            {error ? "error search input can't be empty" : ''}
          </div>
        </div>
        <SearchOptions />
      </form>
    </div>
  );
}
