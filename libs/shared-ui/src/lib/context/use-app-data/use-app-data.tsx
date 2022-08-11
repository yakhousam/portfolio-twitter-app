import { createContext, useContext, useReducer } from 'react';
import {
  ChartDataLine,
  SearchHashtagReturnData,
  TimeFrame,
  combineChartData,
  getMostEngagedTweets,
  getRankedAccounts,
} from '@yak-twitter-app/shared-lib';

export interface AppData extends Omit<SearchHashtagReturnData, 'chartData'> {
  chart: Record<TimeFrame, ChartDataLine>;
  mostFollowedAccountIds: Array<string>;
  mostEngagedTweetsIds: Array<string>;
  status: 'idle' | 'pending' | 'receiving' | 'resolved' | 'rejected';
}

export type ActionType =
  | { type: 'search_start' }
  | { type: 'search_end_success' }
  | { type: 'search_error' }
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
    limit: 450,
    reset: 0,
    remaining: 450,
  },
  rankedAccounts: [],
  mostEngagedTweets: [],
  mostFollowedAccountIds: [],
  mostEngagedTweetsIds: [],
  status: 'idle',
};

function reducer(state: AppData, action: ActionType): AppData {
  switch (action.type) {
    case 'search_start': {
      return {
        ...state,
        original: 0,
        replay: 0,
        retweet: 0,
        chart: initialState.chart,
        rankedAccounts: [],
        mostEngagedTweets: [],
        mostFollowedAccountIds: [],
        mostEngagedTweetsIds: [],
        status: 'pending',
      };
    }
    case 'update_data': {
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
      const mostFollowedAccountIds = rankedAccounts.map(({ id }) => id);
      const mostEngagedTweetsIds = mostEngagedTweets.map(({ id }) => id);
      return {
        ...state,
        ...action.data,
        original: state.original + action.data.original,
        retweet: state.retweet + action.data.retweet,
        replay: state.replay + action.data.replay,
        chart,
        mostEngagedTweets,
        rankedAccounts,
        mostEngagedTweetsIds,
        mostFollowedAccountIds,
        status: 'receiving',
      };
    }
    case 'search_end_success': {
      return { ...state, status: 'resolved' };
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
    default:
      return {
        ...state,
      };
  }
}
interface AppDataProviderProps {
  children: React.ReactNode;
}

export const AppContext = createContext<
  { state: AppData; dispatch: Dispatch } | undefined
>(undefined);

export function AppDataProvider({ children }: AppDataProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within a AppDataProvider');
  }
  return context;
}
