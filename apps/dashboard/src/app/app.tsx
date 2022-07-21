import {
  ChartDataLine,
  combineChartData,
  SearchHashtagReturnData,
  TimeFrame,
} from '@yak-twitter-app/shared-lib';

import { useReducer, useState } from 'react';
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
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
}

export type ActionType =
  | { type: 'update data'; payload: SearchHashtagReturnData }
  | { type: 'fetching' };

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
    case 'fetching': {
      return {
        status: 'pending',
        data: {
          ...state.data,
          chart: initialState.data.chart,
        },
      };
    }
    case 'update data': {
      const chart = combineChartData(
        state.data.chart,
        action.payload.chartData
      );
      // console.log('reducer', chart.h1);
      const data = {
        ...state.data,
        ...action.payload,
        original: state.data.original + action.payload.original,
        retweet: state.data.retweet + action.payload.retweet,
        replay: state.data.replay + action.payload.replay,
        chart,
      };

      return {
        status: 'resolved',
        data,
      };
    }
    default:
      return {
        data: state.data,
        status: 'rejected',
      };
  }
}

export function App() {
  const [{ data }, dispatch] = useReducer(reducer, initialState);

  const restRateLimit = () => {
    // setData((d) => {
    //   if (d) {
    //     d.rateLimit.remaining = d.rateLimit.limit;
    //   }
    //   return d;
    // });
  };

  return (
    <>
      <Header />
      <main className={styles['main']}>
        <SearchBar dispatch={dispatch} />

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
        {/* <TweetsSection
          tweets={data.mostEngagedTweets}
          title="most engaged tweets"
        /> */}
        {/*  <TweetsSection tweetsIds={tweetsIds} title="most followed accounts" /> */}
      </main>
    </>
  );
}

export default App;
