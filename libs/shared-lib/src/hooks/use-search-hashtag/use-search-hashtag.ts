import { useRef } from 'react';
import { SearchForm } from '../../interfaces';

export function useSearchHashtag() {
  const abortControllerRef = useRef<AbortController>();

  const searchHashtag = async (data: Omit<SearchForm, 'errors'>) => {
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;
    const { hashtag, endDate, startDate } = data;
    const startTime = getStartTime(new Date(startDate));
    const endTime = getEndTime(new Date(endDate));

    const response = await fetch(
      `api/search/${hashtag}?startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`,
      { signal }
    );
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
