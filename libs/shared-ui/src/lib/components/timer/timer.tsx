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
      <h3 className={styles['title']}>{title}</h3>
      <p className={styles['text']}>
        <time dateTime={'00:' + timer.replace(/ /g, '')}>{timer}</time>
      </p>
    </div>
  );
}

export default Timer;
