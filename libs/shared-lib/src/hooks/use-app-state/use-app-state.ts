import { useReducer } from 'react';
import { TimeFrame } from '../../helpers/date-helpers';
import { ChartDataLine, SearchHashtagReturnData } from '../../interfaces';
import {
  combineChartData,
  getMostEngagedTweets,
  getRankedAccounts,
  getTweetsByUsers,
} from '../../util/util';

export interface AppData extends Omit<SearchHashtagReturnData, 'chartData'> {
  chart: Record<TimeFrame, ChartDataLine>;
}
export interface State {
  data: AppData;
  status: 'idle' | 'pending' | 'receiving' | 'resolved' | 'rejected';
}

export type ActionType =
  | { type: 'search_start' }
  | { type: 'search_success' }
  | { type: 'search_cancel' }
  | { type: 'search_error'; error: string }
  | { type: 'update_data'; data: SearchHashtagReturnData }
  | { type: 'reset_limit' };

const initialState: State = {
  data: {
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
    rankedAccountsTweets: [],
    mostEngagedTweets: [],
  },
  status: 'idle',
};

function reducer(state: State, action: ActionType): State {
  switch (action.type) {
    case 'search_start': {
      return {
        status: 'pending',
        data: {
          ...state.data,
          chart: initialState.data.chart,
          rankedAccounts: [],
          rankedAccountsTweets: [],
          mostEngagedTweets: [],
        },
      };
    }
    case 'search_success': {
      return {
        ...state,
        status: 'resolved',
      };
    }
    case 'search_cancel': {
      return {
        ...state,
        status: 'resolved',
      };
    }
    case 'update_data': {
      const chart = combineChartData(state.data.chart, action.data.chartData);
      // console.log('reducer', chart.h1);
      const rankedAccounts = getRankedAccounts([
        ...state.data.rankedAccounts,
        ...action.data.rankedAccounts,
      ]);
      console.log({ rankedAccounts });
      const rankedAccountsTweets = getTweetsByUsers(rankedAccounts, [
        ...state.data.rankedAccountsTweets,
        ...action.data.rankedAccountsTweets,
      ]);

      const data: State['data'] = {
        ...state.data,
        ...action.data,
        original: state.data.original + action.data.original,
        retweet: state.data.retweet + action.data.retweet,
        replay: state.data.replay + action.data.replay,
        chart,
        mostEngagedTweets: getMostEngagedTweets([
          ...state.data.mostEngagedTweets,
          ...action.data.mostEngagedTweets,
        ]),
        rankedAccounts,
        rankedAccountsTweets,
      };
      return {
        ...state,
        data,
        status: 'receiving',
      };
    }

    case 'reset_limit': {
      return {
        ...state,
        data: {
          ...state.data,
          rateLimit: {
            ...state.data.rateLimit,
            remaining: state.data.rateLimit.limit,
          },
        },
      };
    }
    default:
      return {
        ...state,
      };
  }
}

export function useAppState(): [State, React.Dispatch<ActionType>] {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}
