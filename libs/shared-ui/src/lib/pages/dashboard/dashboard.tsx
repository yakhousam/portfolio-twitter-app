import {
  AppDataProvider,
  Chart,
  Header,
  RateLimit,
  SearchBar,
  TweetsStatistics,
  TwitterTimelineEmbedList,
  TwitterTweetEmbedList,
} from '@yak-twitter-app/shared-ui';
import styles from './dashboard.module.css';

export interface DashboardProps {}

export function Dashboard() {
  // const { data, status } = state;
  // const isFetching = status === 'pending' || status === 'receiving';
  // const showData = status === 'receiving' || status === 'resolved';
  return (
    <>
      <Header />
      <main className={styles['main']}>
        <AppDataProvider>
          <SearchBar />
        </AppDataProvider>

        {/* {showData && (
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
        )} */}
      </main>
    </>
  );
}

export default Dashboard;
