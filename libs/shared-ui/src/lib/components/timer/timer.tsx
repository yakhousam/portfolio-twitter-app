import { useEffect, useState } from 'react';
import styles from './timer.module.css';

export interface TimerProps {
  title: string;
  timestamp: number;
  onTimerEnd: () => void;
}

function formatTime(timeMiliseconds: number) {
  if (timeMiliseconds < 1) {
    return '00 : 00';
  }
  const d = new Date(timeMiliseconds);
  const minutes = d.getMinutes();
  const secondes = d.getSeconds();
  return `${minutes < 10 ? '0' + minutes : minutes} : ${
    secondes < 10 ? '0' + secondes : secondes
  }`;
}

export function Timer({ title, timestamp, onTimerEnd }: TimerProps) {
  const [timer, setTimer] = useState(
    formatTime(timestamp - new Date().getTime())
  );

  useEffect(() => {
    const id = setTimeout(() => {
      const time = timestamp - new Date().getTime();
      if (time < 1) {
        setTimer('00 : 00');
        onTimerEnd();
        return;
      }
      setTimer(formatTime(time));
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  });

  return (
    <div className={styles['container']}>
      <h2 className={styles['title']}>{title}</h2>
      <p className={styles['text']}>{timer}</p>
    </div>
  );
}

export default Timer;
