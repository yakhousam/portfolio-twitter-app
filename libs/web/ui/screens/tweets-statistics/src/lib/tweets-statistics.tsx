import { useAppState } from '@yak-twitter-app/context/use-app-data';
import { CounterUp } from '@yak-twitter-app/web/ui/components';
import styles from './tweets-statistics.module.css';

export function TweetsStatistics() {
  const { original, replay, retweet } = useAppState();
  console.log('Tweets statistics...........');
  return (
    <section className={styles['container']}>
      <h2 className={styles['title']}>tweets</h2>
      <div className={styles['wrapper']} role="region" aria-live="polite">
        <CounterUp
          title="total"
          from={0}
          to={original + replay + retweet}
          spead={3}
        />
        <CounterUp title="original" from={0} to={original} />
        <CounterUp title="replay" from={0} to={replay} />
        <CounterUp title="retweet" from={0} to={retweet} spead={2} />
      </div>
    </section>
  );
}

export default TweetsStatistics;
