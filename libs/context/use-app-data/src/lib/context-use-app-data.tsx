import { createContext, useContext, useMemo, useReducer } from 'react';
import {
  ChartDataLine,
  SearchHashtagReturnData,
  Status,
  TimeFrame,
} from '@yak-twitter-app/types';

import { combineChartData } from '@yak-twitter-app/utility/app-data-reducer';
import {
  getMostEngagedTweets,
  getRankedAccounts,
} from '@yak-twitter-app/utility/tweets';

export interface AppData
  extends Omit<SearchHashtagReturnData, 'chartData' | 'nextToken'> {
  chart: Record<TimeFrame, ChartDataLine>;
  status: Status;
  error: Record<string, unknown> | string | undefined;
  hashtag: string | undefined;
}

export type ActionType =
  | { type: 'search_start'; hashtag: string }
  | { type: 'search_end_success' }
  | { type: 'search_is_cancelling' }
  | { type: 'search_cancelled' }
  | { type: 'search_not_found' }
  | { type: 'search_error'; error: Record<string, unknown> | string }
  | { type: 'update_data'; data: Omit<SearchHashtagReturnData, 'nextToken'> }
  | { type: 'reset_limit' };

type Dispatch = (action: ActionType) => void;

export const initialState: AppData = {
  original: 0,
  replay: 0,
  retweet: 0,
  chart: {
    m5: { labels: [], datasets: [] },
    m15: { labels: [], datasets: [] },
    m30: { labels: [], datasets: [] },
    h1: { labels: [], datasets: [] },
    h4: { labels: [], datasets: [] },
    d1: { labels: [], datasets: [] },
  },
  rateLimit: {
    limit: 0,
    reset: 0,
    remaining: 0,
  },
  rankedAccounts: [],
  mostEngagedTweets: [],
  status: 'idle',
  error: undefined,
  hashtag: undefined,
};

export function reducer(state: AppData, action: ActionType): AppData {
  switch (action.type) {
    case 'search_start': {
      return {
        ...initialState,
        rateLimit: { ...state.rateLimit },
        status: 'pending',
        hashtag: action.hashtag,
      };
    }
    case 'update_data': {
      if (state.status === 'cancelled') {
        return state;
      }
      const chart = combineChartData(state.chart, action.data.chartData);
      // console.log('reducer', chart.h1);
      const rankedAccounts = getRankedAccounts([
        ...state.rankedAccounts,
        ...action.data.rankedAccounts,
      ]);
      const mostEngagedTweets = getMostEngagedTweets([
        ...state.mostEngagedTweets,
        ...action.data.mostEngagedTweets,
      ]);
      return {
        ...state,
        ...action.data,
        original: state.original + action.data.original,
        retweet: state.retweet + action.data.retweet,
        replay: state.replay + action.data.replay,
        chart,
        mostEngagedTweets,
        rankedAccounts,
        status: 'receiving',
      };
    }
    case 'search_end_success': {
      return { ...state, status: 'resolved' };
    }
    case 'search_cancelled': {
      return { ...state, status: 'cancelled' };
    }
    case 'search_is_cancelling': {
      return { ...state, status: 'isCancelling' };
    }
    case 'search_error': {
      return { ...state, status: 'rejected', error: action.error };
    }

    case 'reset_limit': {
      return {
        ...state,
        rateLimit: {
          ...state.rateLimit,
          remaining: state.rateLimit.limit,
        },
      };
    }
    case 'search_not_found': {
      return {
        ...state,
        status: 'notFound',
      };
    }
    default:
      return state;
  }
}
interface AppDataProviderProps {
  children: React.ReactNode;
}

export const AppStateContext = createContext<
  Omit<AppData, 'status' | 'error'> | undefined
>(undefined);
export const AppDispatchContext = createContext<Dispatch | undefined>(
  undefined
);
export const AppStatusContext = createContext<
  { status: Status; error: AppData['error']; isData: boolean } | undefined
>(undefined);

export function AppDataProvider({ children }: AppDataProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { status, error, ...data } = state;
  const isData = data.chart.d1.labels.length > 0;
  const statusContext = useMemo(
    () => ({ status, error, isData }),
    [status, error, isData]
  );

  return (
    <AppStateContext.Provider value={data}>
      <AppStatusContext.Provider value={statusContext}>
        <AppDispatchContext.Provider value={dispatch}>
          {children}
        </AppDispatchContext.Provider>
      </AppStatusContext.Provider>
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppDataProvider');
  }
  return context;
}

export function useAppDispatch() {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppDataProvider');
  }
  return context;
}

export function useAppStatus() {
  const context = useContext(AppStatusContext);
  if (context === undefined) {
    throw new Error('useAppStatus must be used within a AppDataProvider');
  }
  return context;
}
