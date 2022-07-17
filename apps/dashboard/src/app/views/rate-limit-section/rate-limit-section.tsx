// import Info from '../../components/info/info';
// import Timer from '../../components/timer/timer';
import { Info, Timer } from '@yak-twitter-app/shared-ui';
import styles from './rate-limit-section.module.css';

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
          countDownDirection="down"
        />
        <Info
          title="remaining"
          highValue={limit}
          lowValue={remaining}
          countDownDirection="down"
        />
        <Timer title="reset" timestamp={reset * 1000} onTimerEnd={onTimerEnd} />
      </div>
    </section>
  );
}

export default RateLimit;
