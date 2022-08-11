import {
  Chart,
  Header,
  RateLimit,
  SearchBar,
  TweetsStatistics,
  TwitterTimelineEmbedList,
  TwitterTweetEmbedList,
  useAppData,
} from '@yak-twitter-app/shared-ui';
import styles from './dashboard.module.css';

export function Dashboard() {
  const {
    state: { status },
  } = useAppData();

  const show = status !== 'idle';

  return (
    <>
      <Header />
      <main className={styles['main']}>
        <SearchBar />
        {show && (
          <>
            <div className={styles['stat-wrapper']}>
              <TweetsStatistics />
              <RateLimit />
            </div>
            <Chart />
            {status === 'resolved' && (
              <>
                <TwitterTweetEmbedList />
                <TwitterTimelineEmbedList />
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default Dashboard;
