// import { useAppState } from '@yak-twitter-app/context';
import { useAppStatus } from '@yak-twitter-app/context';
import {
  Chart,
  Header,
  RateLimit,
  SearchBar,
  TweetsStatistics,
  TwitterTimelineEmbedList,
  TwitterTweetEmbedList,
} from '@yak-twitter-app/shared-ui';
import styles from './dashboard.module.css';

export function Dashboard() {
  const status = useAppStatus();
  const show = status !== 'idle' && status !== 'rejected';

  console.log('dashboard............');
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
            {(status === 'resolved' || status === 'cancelled') && (
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
