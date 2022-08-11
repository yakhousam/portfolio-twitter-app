import { ActionType, useAppData } from '@yak-twitter-app/shared-ui';
import { Dispatch, useCallback } from 'react';
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
  dispatch: Dispatch<ActionType>;
}

export function RateLimit() {
  const {
    state: {
      rateLimit: { limit, remaining, reset },
    },
    dispatch,
  } = useAppData();
  const resetRateLimit = useCallback(() => {
    console.log('reset rate limite fn');
    dispatch({ type: 'reset_limit' });
  }, [dispatch]);
  const seconds = Math.floor((reset - new Date().getTime()) / 1000);
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
        <Timer title="reset" seconds={seconds} onTimerEnd={resetRateLimit} />
      </div>
    </section>
  );
}

export default RateLimit;
