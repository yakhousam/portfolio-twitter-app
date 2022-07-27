import { useState, useCallback, useRef, useEffect } from 'react';
import { getData } from '../../api';
import { ActionType, useAppState } from '../use-app-state/use-app-state';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseSearch {
  count: number;
  increment: () => void;
}

export function useSearch(dispatch: React.Dispatch<ActionType>) {
  const abortControllerRef = useRef<AbortController>();
  useEffect(() => {
    function cancelFetch() {
      abortControllerRef.current?.abort();
    }
    window.addEventListener('beforeunload', cancelFetch);
    return () => window.removeEventListener('beforeunload', cancelFetch);
  }, []);

  const searchHashtag = (hashtag: string) => {
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;
    console.log({ signal });
    getData(hashtag, dispatch, signal);
  };
  const cancelSearch = () => {
    console.log('handle cancel..............');
    abortControllerRef.current?.abort();
    dispatch({ type: 'search_cancel' });
  };
  return { searchHashtag, cancelSearch };
}

export default useSearch;
