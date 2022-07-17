import Info from '../../components/info/info';
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
        <Info title="total" info={original + replay + retweet} />
        <Info title="original" info={original} />
        <Info title="replay" info={replay} />
        <Info title="retweet" info={retweet} />
      </div>
    </section>
  );
}

export default TweetsStatisticsSection;
