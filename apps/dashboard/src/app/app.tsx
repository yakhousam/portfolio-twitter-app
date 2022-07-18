import {
  ChartDataLine,
  combineChartData,
  formatChartData,
  getChartData,
  SearchHashtagReturnData,
  TimeFrame,
} from '@yak-twitter-app/shared-lib';
import { ChartData } from 'chart.js';

import { useState } from 'react';
import styles from './app.module.css';
import ChartSection from './views/chart-section/chart-section';
import Header from './views/header/header';
import RateLimit from './views/rate-limit-section/rate-limit-section';
import SearchBar from './views/search-bar/search-bar';
import TweetsStatisticsSection from './views/tweets-statistics-section/tweets-statistics-section';

export interface AppData extends Omit<SearchHashtagReturnData, 'chartData'> {
  chart: Record<TimeFrame, ChartDataLine>;
}

export function App() {
  const [data, setData] = useState<AppData | null>(null);

  const handleUpdateData = (newData: SearchHashtagReturnData | null) => {
    setData((d) => {
      if (!newData) {
        return null;
      }
      const chart = d
        ? combineChartData(d.chart, newData.chartData)
        : combineChartData(null, newData.chartData);
      const data = {
        ...newData,
        original: d ? d.original + newData.original : newData.original,
        retweet: d ? d.retweet + newData.retweet : newData.retweet,
        replay: d ? d.replay + newData.replay : newData.replay,
        chart,
      };
      return data;
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
