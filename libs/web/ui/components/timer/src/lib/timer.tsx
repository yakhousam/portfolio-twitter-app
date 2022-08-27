import { useTimer } from '@yak-twitter-app/hooks/use-timer';
import { useEffect } from 'react';
import { Output } from '@yak-twitter-app/web-ui-components-output';
import { secondsToHHMMSS } from '@yak-twitter-app/utility/date';

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

  const timerStr = secondsToHHMMSS(timer || 0);
  return (
    <Output
      label={label}
      value={
        <time dateTime={'00:' + timerStr.replace(/ /g, '')}>{timerStr}</time>
      }
    />
  );
}

export default Timer;
