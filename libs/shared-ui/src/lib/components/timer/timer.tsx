import { useTimer } from '@yak-twitter-app/shared-lib';
import { useEffect } from 'react';
import styles from './timer.module.css';

export interface TimerProps {
  title: string;
  seconds: number;
  onTimerEnd: () => void;
}

export function Timer({ title, seconds, onTimerEnd }: TimerProps) {
  const { timer, startTimer } = useTimer();
  useEffect(() => {
    if (seconds > 0) {
      startTimer(seconds);
    }
  }, [seconds, startTimer]);
  useEffect(() => {
    if (timer === 0) {
      onTimerEnd();
    }
  }, [timer, onTimerEnd]);

  const timerStr = formatTime(timer || 0);
  return (
    <div className={styles['container']}>
      <h3 className={styles['title']}>{title}</h3>
      <p className={styles['text']}>
        <time dateTime={'00:' + timerStr}>{timerStr}</time>
      </p>
    </div>
  );
}

export default Timer;

function formatTime(seconds: number) {
  if (seconds < 1) {
    return '00 : 00';
  }

  const m = Math.floor(seconds / 60);
  const s = seconds - m * 60;
  return `${m < 10 ? '0' + m : m} : ${s < 10 ? '0' + s : s}`;
}
