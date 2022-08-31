import styles from './rate-limit.module.css';
import { useCallback } from 'react';
import {
  useAppDispatch,
  useAppState,
} from '@yak-twitter-app/context/use-app-data';
import { Output } from '@yak-twitter-app/web-ui-components-output';
import { Timer } from '@yak-twitter-app/web-ui-components-timer';

export function RateLimit() {
  const {
    rateLimit: { limit, remaining, reset },
  } = useAppState();
  const dispatch = useAppDispatch();
  const resetRateLimit = useCallback(() => {
    dispatch({ type: 'reset_limit' });
  }, [dispatch]);
  const seconds = Math.floor((reset - new Date().getTime()) / 1000);
  return (
    <section className={styles['container']}>
      <h2 className={styles['title']}>rate limit</h2>
      <div className={styles['wrapper']}>
        <div className={styles['output-wrapper']}>
          <Output label="limit" value={limit} />
        </div>
        <div className={styles['output-wrapper']}>
          <Output label="remaining" value={remaining} />
        </div>
        <div className={styles['output-wrapper']}>
          <Timer label="reset" seconds={seconds} onTimerEnd={resetRateLimit} />
        </div>
      </div>
    </section>
  );
}

export default RateLimit;
