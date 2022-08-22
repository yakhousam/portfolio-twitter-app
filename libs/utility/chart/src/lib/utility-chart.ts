import { TimeFrame } from '@yak-twitter-app/types';

export function getOffset(timeFrame: TimeFrame): number {
  switch (timeFrame) {
    case 'd1':
      return 7;
    case 'h4':
      return 12;
    case 'h1':
      return 20;
    case 'm30':
      return 25;
    case 'm15':
      return 40;
    case 'm5':
      return 50;
    default:
      return 20;
  }
}

export function formatDate(date: Date, activeTimeFrame: TimeFrame) {
  const hour = date.getHours();

  switch (activeTimeFrame) {
    case 'h1': {
      if (hour === 0) {
        return date.toLocaleDateString();
      }
      if (hour % 4 === 0) {
        return `${date.getHours()}:00`;
      }
      return null;
    }
    case 'h4': {
      if (hour === 0) {
        return date.toLocaleDateString();
      }
      if (hour % 4 === 0) {
        return `${date.getHours()}:00`;
      }
      return null;
    }
    default: {
      const minutes = date.getMinutes();
      if (hour === 0 && minutes === 0) {
        return date.toLocaleDateString();
      }
      if (minutes === 0) {
        return `${date.getHours()}:00`;
      }
      return null;
    }
  }
}
