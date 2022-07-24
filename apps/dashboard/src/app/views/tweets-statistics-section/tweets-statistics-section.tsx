import { Info } from '@yak-twitter-app/shared-ui';
import styles from './tweets-statistics-section.module.css';

export interface TweetsStatisticsSectionProps {
  original: number;
  replay: number;
  retweet: number;
}

export function TweetsStatisticsSection({
  original,
  replay,
  retweet,
}: TweetsStatisticsSectionProps) {
  return (
    <section className={styles['container']}>
      <h1 className={styles['h1']}>tweets</h1>
      <div className={styles['wrapper']}>
        <Info
          title="total"
          highValue={original + replay + retweet}
          lowValue={0}
          spead={3}
        />
        <Info title="original" highValue={original} lowValue={0} />
        <Info title="replay" highValue={replay} lowValue={0} />
        <Info title="retweet" highValue={retweet} lowValue={0} spead={2} />
      </div>
    </section>
  );
}

export default TweetsStatisticsSection;
