import { useState, useEffect, useCallback } from 'react';

export function useTimer(seconds?: number) {
  const [timer, setTimer] = useState<number | undefined>(
    seconds && seconds > 0 ? seconds : undefined
  );
  useEffect(() => {
    const id = setTimeout(() => {
      if (timer && timer < 1) return;
      if (timer === undefined) return;
      setTimer((c) => {
        return c && c > 0 ? c - 1 : 0;
      });
    }, 1000);
    return () => clearTimeout(id);
  });
  const startTimer = useCallback((secondes: number) => {
    if (secondes <= 0) return;
    setTimer(secondes);
  }, []);
  return { timer, startTimer };
}

export default useTimer;
