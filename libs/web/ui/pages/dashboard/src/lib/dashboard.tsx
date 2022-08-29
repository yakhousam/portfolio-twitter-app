import styles from './dashboard.module.css';
import { useAppStatus } from '@yak-twitter-app/context/use-app-data';
import { Header } from '@yak-twitter-app/web/ui/screens/header';
import { SearchBar } from '@yak-twitter-app/web/ui/screens/search-bar';
import { RateLimit } from '@yak-twitter-app/web/ui/screens/rate-limit';
import { Chart } from '@yak-twitter-app/web/ui/screens/chart';
import { TwitterTweetEmbedList } from '@yak-twitter-app/web/ui/screens/twitter-tweet-embed-list';
import { TwitterTimelineEmbedList } from '@yak-twitter-app/web/ui/screens/twitter-timeline-embed-list';
import { TweetsStatistics } from '@yak-twitter-app/web/ui/screens/tweets-statistics';

export function Dashboard() {
  const status = useAppStatus();
  const show =
    status === 'receiving' || status === 'resolved' || status === 'cancelled';

  console.log('dashboard............');
  return (
    <>
      <Header />
      <main className={styles['main']}>
        <SearchBar />
        {status === 'rejected' && (
          <div className={styles['error']}> Error while streaming data!</div>
        )}
        {show && (
          <>
            <div className={styles['stat-wrapper']}>
              <TweetsStatistics />
              <RateLimit />
            </div>
            <Chart />
          </>
        )}
        {(status === 'resolved' || status === 'cancelled') && (
          <>
            <TwitterTweetEmbedList />
            <TwitterTimelineEmbedList />
          </>
        )}
      </main>
    </>
  );
}

export default Dashboard;
