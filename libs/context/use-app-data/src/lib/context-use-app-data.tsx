import { createContext, useContext, useReducer } from 'react';
import {
  ChartDataLine,
  SearchHashtagReturnData,
  TimeFrame,
} from '@yak-twitter-app/types';
import { combineChartData } from '@yak-twitter-app/utility/app-data-reducer';
import {
  getMostEngagedTweets,
  getRankedAccounts,
} from '@yak-twitter-app/utility/tweets';

type Status =
  | 'idle'
  | 'pending'
  | 'receiving'
  | 'resolved'
  | 'rejected'
  | 'isCancelling'
  | 'cancelled';

export interface AppData extends Omit<SearchHashtagReturnData, 'chartData'> {
  chart: Record<TimeFrame, ChartDataLine>;
  status: Status;
  error: Record<string, unknown> | undefined;
}

export type ActionType =
  | { type: 'search_start' }
  | { type: 'search_end_success' }
  | { type: 'search_is_cancelling' }
  | { type: 'search_cancelled' }
  | { type: 'search_error'; error: Record<string, unknown> }
  | { type: 'update_data'; data: SearchHashtagReturnData }
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
};

export function reducer(state: AppData, action: ActionType): AppData {
  switch (action.type) {
    case 'search_start': {
      return {
        ...initialState,
        rateLimit: { ...state.rateLimit },
        status: 'pending',
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
  { status: Status; error: AppData['error'] } | undefined
>(undefined);

export function AppDataProvider({ children }: AppDataProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { status, error, ...data } = state;

  return (
    <AppStateContext.Provider value={data}>
      <AppStatusContext.Provider value={{ status, error }}>
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
