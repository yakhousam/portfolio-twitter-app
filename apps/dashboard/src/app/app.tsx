import { useAppState } from '@yak-twitter-app/shared-lib';
import {
  Chart,
  Header,
  RateLimit,
  SearchBar,
  TwitterTweetEmbedList,
  TwitterTimelineEmbedList,
  TweetsStatistics,
} from '@yak-twitter-app/shared-ui';

import styles from './app.module.css';

export function App() {
  const {
    cancelSearch,
    searchHashtag,
    state: { data, status },
    dispatch,
  } = useAppState();
  const isFetching = status === 'pending' || status === 'receiving';
  const showData = status === 'receiving' || status === 'resolved';
  console.log(data.rankedAccounts.map(({ id }) => id));
  return (
    <>
      <Header />
      <main className={styles['main']}>
        <SearchBar
          handleCancle={cancelSearch}
          handleSearch={searchHashtag}
          isFetching={isFetching}
        />

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
            <TwitterTweetEmbedList
              tweetsIds={data.mostEngagedTweetsIds}
              title="most engaged tweets"
            />
            <TwitterTimelineEmbedList
              usersIds={data.mostFollowedAccountIds}
              title="most followed accounts"
            />
          </>
        )}
      </main>
    </>
  );
}

export default App;
