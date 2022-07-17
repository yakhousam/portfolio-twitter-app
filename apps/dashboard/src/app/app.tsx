// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { analyzeTweets, data } from '@yak-twitter-app/shared-lib';
import {
  ChartSection,
  Header,
  RateLimit,
  SearchBar,
  TweetsSection,
  TweetsStatisticsSection,
} from '@yak-twitter-app/shared-ui';
import styles from './app.module.css';

export function App() {
  const tweets = analyzeTweets(data.tweets).chart;
  const tweetsIds = [
    '1545260483980234753',
    '1545260274726453248',
    '1545260256636424194',
    '1545259630015774722',
    '1545258875993133056',
    '1545258356834721793',
  ];
  return (
    <>
      <Header />
      <main className={styles['main']}>
        <SearchBar />
        <div className={styles['stat-wrapper']}>
          <TweetsStatisticsSection original={120} replay={150} retweet={140} />
          <RateLimit
            rateLimit={{ limit: 480, remaining: 470, reset: 1657387606972 }}
          />
        </div>
        <ChartSection data={tweets} />
        <TweetsSection tweetsIds={tweetsIds} title="most engaged tweets" />
        <TweetsSection tweetsIds={tweetsIds} title="most followed accounts" />
      </main>
    </>
  );
}

export default App;
