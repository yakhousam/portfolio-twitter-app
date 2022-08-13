import styles from './tweets-statistics.module.css';
import { CounterUp } from '../../components/counter-up/counter-up';
import { useAppData } from '../../context/use-app-data/use-app-data';

export function TweetsStatistics() {
  const {
    state: { original, replay, retweet },
  } = useAppData();

  return (
    <section className={styles['container']}>
      <h2 className={styles['title']}>tweets</h2>
      <div className={styles['wrapper']}>
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
