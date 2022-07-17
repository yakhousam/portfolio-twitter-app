import { SearchHashtagReturnData } from '@yak-twitter-app/shared-lib';

import { useState } from 'react';
import styles from './app.module.css';
import Header from './views/header/header';
import RateLimit from './views/rate-limit-section/rate-limit-section';
import SearchBar from './views/search-bar/search-bar';
import TweetsStatisticsSection from './views/tweets-statistics-section/tweets-statistics-section';

export function App() {
  const [data, setData] = useState<SearchHashtagReturnData | null>(null);

  const handleUpdateData = (newData: SearchHashtagReturnData) => {
    console.log({ newData });
    setData((d) => {
      console.log({ d });
      if (!d) {
        return newData;
      }
      return {
        ...d,
        original: d.original + newData.original,
        retweet: d.retweet + newData.retweet,
        replay: d.replay + newData.replay,
      };
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
              />
            </div>
            {/*  <ChartSection data={tweets} />
        <TweetsSection tweetsIds={tweetsIds} title="most engaged tweets" />
        <TweetsSection tweetsIds={tweetsIds} title="most followed accounts" /> */}
          </>
        ) : null}
      </main>
    </>
  );
}

export default App;
