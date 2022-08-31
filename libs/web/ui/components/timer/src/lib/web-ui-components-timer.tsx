// import styles from './web-ui-components-timer.module.css';
import { useTimer } from '@yak-twitter-app/hooks/use-timer';
import { useEffect } from 'react';
import { Output } from '@yak-twitter-app/web-ui-components-output';
import { secondsToMMSS } from '@yak-twitter-app/utility/date';

export interface WebUiComponentsTimerProps {
  label: string;
  seconds: number;
  onTimerEnd: () => void;
}

export function WebUiComponentsTimer({
  label,
  seconds,
  onTimerEnd,
}: WebUiComponentsTimerProps) {
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

  const timerStr = secondsToMMSS(timer || 0);
  return (
    <Output
      label={label}
      value={
        <time dateTime={'00:' + timerStr.replace(/ /g, '')}>{timerStr}</time>
      }
    />
  );
}

export default WebUiComponentsTimer;
