import styles from './dashboard.module.css';
import { useAppStatus } from '@yak-twitter-app/context/use-app-data';
import { Header } from '@yak-twitter-app/web/ui/screens/header';
import { SearchBar } from '@yak-twitter-app/web/ui/screens/search-bar';
import { RateLimit } from '@yak-twitter-app/web/ui/screens/rate-limit';
import { Chart } from '@yak-twitter-app/web/ui/screens/chart';
import { TwitterTweetEmbedList } from '@yak-twitter-app/web/ui/screens/twitter-tweet-embed-list';
import { TwitterTimelineEmbedList } from '@yak-twitter-app/web/ui/screens/twitter-timeline-embed-list';
import { TweetsStatistics } from '@yak-twitter-app/web/ui/screens/tweets-statistics';
import { ErrorMessage } from '@yak-twitter-app/web-ui-components-error-message';

export function Dashboard() {
  console.log('dashboard............');
  return (
    <>
      <Header />
      <main className={styles['main']}>
        <SearchBar />
        <Main />
      </main>
    </>
  );
}

export default Dashboard;

function Main() {
  const { status, error, isData } = useAppStatus();

  const show = status !== 'idle' && status !== 'pending';
  console.log('dashboard Main............', status, error);

  if (!isData) {
    return null;
  }
  return (
    <>
      {status === 'rejected' && error && <ErrorMessage error={error} />}
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
    </>
  );
}
