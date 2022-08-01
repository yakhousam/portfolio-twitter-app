import { useRef, useEffect } from 'react';
import { getData } from '../../api';
import { SearchForm } from '../../interfaces';
import { ActionType } from '../use-app-state/use-app-state';

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

  const searchHashtag = (data: SearchForm) => {
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;
    console.log({ signal });
    getData(data, dispatch, signal);
  };
  const cancelSearch = () => {
    console.log('handle cancel..............');
    abortControllerRef.current?.abort();
    dispatch({ type: 'search_cancel' });
  };
  return { searchHashtag, cancelSearch };
}

export default useSearch;
