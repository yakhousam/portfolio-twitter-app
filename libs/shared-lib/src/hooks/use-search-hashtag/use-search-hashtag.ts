import { useRef, useState } from 'react';
import { SearchForm } from '../../interfaces';

type Status = 'idle' | 'pending' | 'resolved' | 'reject';

export function useSearchHashtag() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController>();

  const searchHashtag = async (data: Omit<SearchForm, 'errors'>) => {
    setStatus('pending');
    setError(null);
    try {
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
      setStatus('resolved');
      return reader;
    } catch (error) {
      console.error(error);
      setError(error as Error);
      return setStatus('reject');
    }
  };
  const cancelSearch = () => {
    abortControllerRef.current?.abort();
    setStatus('resolved');
  };
  return {
    searchHashtag,
    cancelSearch,
    isLoading: status === 'pending',
    error,
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
