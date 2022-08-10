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
  return (
    <>
      <Header />
      <AppDataProvider>
        <main className={styles['main']}>
          <SearchBar />
          <div className={styles['stat-wrapper']}>
            <TweetsStatistics />
            <RateLimit />
          </div>
          <Chart />
          <TwitterTweetEmbedList />
          <TwitterTimelineEmbedList />
        </main>
      </AppDataProvider>
    </>
  );
}

export default Dashboard;
