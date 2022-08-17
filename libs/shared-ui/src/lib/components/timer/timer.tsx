import { useTimer } from '@yak-twitter-app/shared-lib';
import { useEffect } from 'react';
import { Output } from '../output/output';
import styles from './timer.module.css';

export interface TimerProps {
  label: string;
  seconds: number;
  onTimerEnd: () => void;
}

export function Timer({ label, seconds, onTimerEnd }: TimerProps) {
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
    <Output
      label={label}
      value={<time dateTime={'00:' + timerStr}>{timerStr}</time>}
    />
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
