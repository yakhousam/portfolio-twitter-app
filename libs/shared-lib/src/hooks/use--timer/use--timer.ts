import { useState, useEffect } from 'react';

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

export function useTimer(timestamp: number, callback: () => void, ms = 1000) {
  const [timer, setTimer] = useState(timestamp - new Date().getTime());

  useEffect(() => {
    const id = setTimeout(() => {
      const time = timestamp - new Date().getTime();
      if (time > 0) {
        setTimer(time);
      } else {
        setTimer(0);
        return;
      }
    }, ms);
    return () => {
      clearTimeout(id);
    };
  });

  useEffect(() => {
    if (timer === 0) {
      callback();
    }
  }, [timer]);

  return formatTime(timer);
}

export default useTimer;
