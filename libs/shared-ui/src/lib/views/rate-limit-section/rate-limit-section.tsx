import Info from '../../components/info/info';
import Timer from '../../components/timer/timer';
import styles from './rate-limit-section.module.css';

export interface RateLimitProps {
  rateLimit: {
    limit: number;
    reset: number;
    remaining: number;
  };
}

export function RateLimit({
  rateLimit: { limit, remaining, reset },
}: RateLimitProps) {
  return (
    <section className={styles['container']}>
      <h1 className={styles['h1']}>rate limit</h1>
      <div className={styles['wrapper']}>
        <Info title="limit" info={limit} />
        <Info title="remaining" info={remaining} />
        <Timer
          title="reset"
          timestamp={reset}
          onTimerEnd={() => console.log('timer end')}
        />
      </div>
    </section>
  );
}

export default RateLimit;
