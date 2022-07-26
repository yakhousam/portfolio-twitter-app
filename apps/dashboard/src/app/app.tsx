import { useAppState } from '@yak-twitter-app/shared-lib';
import {
  Chart,
  Header,
  RateLimit,
  SearchBar,
  TwitterEmbedList,
  TweetsStatistics,
} from '@yak-twitter-app/shared-ui';

import styles from './app.module.css';

export function App() {
  const [{ data, status }, dispatch] = useAppState();

  const showData = status === 'receiving' || status === 'resolved';
  console.log(data.rankedAccounts.map(({ id }) => id));
  return (
    <>
      <Header />
      <main className={styles['main']}>
        <SearchBar dispatch={dispatch} status={status} />

        {showData && (
          <>
            <div className={styles['stat-wrapper']}>
              <TweetsStatistics
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
                dispatch={dispatch}
              />
            </div>
            <Chart data={data.chart} />
          </>
        )}
        {status === 'resolved' && (
          <>
            <TwitterEmbedList
              tweets={data.mostEngagedTweets}
              title="most engaged tweets"
            />
            {/* <TweetsList
              tweets={data.rankedAccountsTweets}
              title="most followed accounts"
            /> */}
          </>
        )}
      </main>
    </>
  );
}

export default App;
