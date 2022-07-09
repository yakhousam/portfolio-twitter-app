// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { analyzeTweets, data } from '@yak-twitter-app/shared-lib';
import {
  ChartSection,
  Header,
  RankedAccounts,
  RateLimit,
  SearchBar,
  TweetsSection,
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
        <TweetsSection original={120} replay={150} retweet={140} />
        <RateLimit
          rateLimit={{ limit: 480, remaining: 470, reset: 1657387606972 }}
        />
        <ChartSection data={tweets} />
        <RankedAccounts tweetsIds={tweetsIds} />
      </main>
    </>
  );
}

export default App;
