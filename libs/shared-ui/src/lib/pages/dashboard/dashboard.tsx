import {
  AppDataProvider,
  Chart,
  Header,
  RateLimit,
  SearchBar,
  TweetsStatistics,
  TwitterTimelineEmbedList,
  TwitterTweetEmbedList,
  useAppData,
} from '@yak-twitter-app/shared-ui';
import { ThemeProvider } from '../../context/use-theme/use-theme';
import styles from './dashboard.module.css';

function Dashboard() {
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
function DashboardWrapper() {
  return (
    <ThemeProvider>
      <AppDataProvider>
        <Dashboard />
      </AppDataProvider>
    </ThemeProvider>
  );
}

export { DashboardWrapper as Dashboard };
