import { useTimer } from '@yak-twitter-app/shared-lib';
import styles from './timer.module.css';

export interface TimerProps {
  title: string;
  timestamp: number;
  onTimerEnd: () => void;
}

export function Timer({ title, timestamp, onTimerEnd }: TimerProps) {
  const timer = useTimer(timestamp, onTimerEnd);
  return (
    <div className={styles['container']}>
      <h2 className={styles['title']}>{title}</h2>
      <p className={styles['text']}>{timer}</p>
    </div>
  );
}

export default Timer;
