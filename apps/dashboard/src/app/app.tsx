import {
  combineChartData,
  SearchHashtagReturnData,
} from '@yak-twitter-app/shared-lib';

import { useState } from 'react';
import styles from './app.module.css';
import ChartSection from './views/chart-section/chart-section';
import Header from './views/header/header';
import RateLimit from './views/rate-limit-section/rate-limit-section';
import SearchBar from './views/search-bar/search-bar';
import TweetsStatisticsSection from './views/tweets-statistics-section/tweets-statistics-section';

export function App() {
  const [data, setData] = useState<SearchHashtagReturnData | null>(null);

  const handleUpdateData = (newData: SearchHashtagReturnData | null) => {
    setData((d) => {
      if (!d || !newData) {
        return newData;
      }
      return {
        ...newData,
        original: d.original + newData.original,
        retweet: d.retweet + newData.retweet,
        replay: d.replay + newData.replay,
        chart: {
          m5: combineChartData(d.chart.m5, newData.chart.m5),
          m15: combineChartData(d.chart.m15, newData.chart.m15),
          m30: combineChartData(d.chart.m30, newData.chart.m30),
          h1: combineChartData(d.chart.h1, newData.chart.h1),
          h4: combineChartData(d.chart.h4, newData.chart.h4),
          d1: combineChartData(d.chart.d1, newData.chart.d1),
        },
      };
    });
  };
  const restRateLimit = () => {
    setData((d) => {
      if (d) {
        d.rateLimit.remaining = d.rateLimit.limit;
      }
      return d;
    });
  };

  return (
    <>
      <Header />
      <main className={styles['main']}>
        <SearchBar handleUpdateData={handleUpdateData} />
        {data ? (
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
            {/*  <TweetsSection tweetsIds={tweetsIds} title="most engaged tweets" />
        <TweetsSection tweetsIds={tweetsIds} title="most followed accounts" /> */}
          </>
        ) : null}
      </main>
    </>
  );
}

export default App;
