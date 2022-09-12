import { useRef } from 'react';
import { SearchForm } from '@yak-twitter-app/types';

export function useSearchHashtag() {
  const abortControllerRef = useRef<AbortController>();

  const searchHashtag = async (data: Omit<SearchForm, 'errors'>) => {
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;
    const { hashtag, endDate, startDate } = data;
    const startTime = getStartTime(new Date(startDate));
    const endTime = getEndTime(new Date(endDate));

    const response = await fetch(
      `api/search/hashtag/${hashtag}?startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`,
      { signal }
    );
    if (response.status > 299) {
      throw JSON.stringify({
        status: response.status,
        message: response.statusText,
      });
    }
    const reader = response?.body?.getReader();

    return reader;
  };
  const cancelSearch = () => {
    abortControllerRef.current?.abort();
  };
  return {
    searchHashtag,
    cancelSearch,
  };
}

function getStartTime(d: Date) {
  const today = new Date();
  d.setHours(today.getHours());
  d.setMinutes(today.getMinutes());
  d.setSeconds(today.getSeconds());
  return d;
}

function getEndTime(d: Date) {
  const today = new Date();
  d.setHours(today.getHours());
  d.setMinutes(today.getMinutes());
  d.setSeconds(today.getSeconds() - 30);
  return d;
}
