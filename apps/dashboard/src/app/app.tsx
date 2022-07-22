import {
  ChartDataLine,
  combineChartData,
  getMostEngagedTweets,
  SearchHashtagReturnData,
  TimeFrame,
} from '@yak-twitter-app/shared-lib';

import { useCallback, useReducer } from 'react';
import styles from './app.module.css';
import ChartSection from './views/chart-section/chart-section';
import Header from './views/header/header';
import RateLimit from './views/rate-limit-section/rate-limit-section';
import SearchBar from './views/search-bar/search-bar';
import TweetsSection from './views/tweets-section/tweets-section';
import TweetsStatisticsSection from './views/tweets-statistics-section/tweets-statistics-section';

export interface AppData extends Omit<SearchHashtagReturnData, 'chartData'> {
  chart: Record<TimeFrame, ChartDataLine>;
}
interface State {
  data: AppData;
  status: 'idle' | 'pending' | 'receiving' | 'resolved' | 'rejected';
}

export type ActionType =
  | { type: 'search_start' }
  | { type: 'search_success' }
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
    case 'update_data': {
      const chart = combineChartData(state.data.chart, action.data.chartData);
      // console.log('reducer', chart.h1);
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
      };
      return {
        ...state,
        data,
        status: 'receiving',
      };
    }
    case 'search_success': {
      return {
        ...state,
        status: 'resolved',
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

export function App() {
  const [{ data, status }, dispatch] = useReducer(reducer, initialState);

  const restRateLimit = useCallback(() => {
    console.log('rest rate limite fn');
    dispatch({ type: 'reset_limit' });
  }, []);

  const showData = status === 'receiving' || status === 'resolved';

  return (
    <>
      <Header />
      <main className={styles['main']}>
        <SearchBar dispatch={dispatch} />

        {showData && (
          <>
            <div className={styles['stat-wrapper']}>
              <TweetsStatisticsSection
                original={data.original}
                replay={data.replay}
                retweet={data.retweet}
              />
              <RateLimit
                rateLimit={{
                  limit: data.rateLimit.limit,
                  remaining: data.rateLimit.remaining,
                  reset: data.rateLimit.reset,
                }}
                onTimerEnd={restRateLimit}
              />
            </div>
            <ChartSection data={data.chart} />
          </>
        )}
        {status === 'resolved' && (
          <>
            <TweetsSection
              tweets={data.mostEngagedTweets}
              title="most engaged tweets"
            />
            {/*  <TweetsSection tweetsIds={tweetsIds} title="most followed accounts" /> */}
          </>
        )}
      </main>
    </>
  );
}

export default App;
