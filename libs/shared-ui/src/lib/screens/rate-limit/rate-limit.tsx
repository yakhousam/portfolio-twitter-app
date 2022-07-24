import Info from '../../components/info/info';
import Timer from '../../components/timer/timer';
import styles from './rate-limit.module.css';
// TODO: remaining not resetting when timer finish
export interface RateLimitProps {
  rateLimit: {
    limit: number;
    reset: number;
    remaining: number;
  };
  onTimerEnd: () => void;
}

export function RateLimit({
  onTimerEnd,
  rateLimit: { limit, remaining, reset },
}: RateLimitProps) {
  return (
    <section className={styles['container']}>
      <h1 className={styles['h1']}>rate limit</h1>
      <div className={styles['wrapper']}>
        <Info
          title="limit"
          highValue={limit}
          lowValue={limit}
          animate={false}
        />
        <Info
          title="remaining"
          highValue={remaining}
          lowValue={remaining}
          animate={false}
        />
        <Timer title="reset" timestamp={reset} onTimerEnd={onTimerEnd} />
      </div>
    </section>
  );
}

export default RateLimit;
