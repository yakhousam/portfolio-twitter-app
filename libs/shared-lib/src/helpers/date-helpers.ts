export function getDefaultEndTime() {
  const today = new Date();
  today.setUTCSeconds(today.getUTCSeconds() - 30);
  return today.toISOString();
}
export function getDefaultStartTime() {
  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  return yesterday.toISOString();
}

export function isDateValid(date: string): boolean {
  const d = new Date(date);
  return !Number.isNaN(d.getTime());
}

export function dateRange5min(date: string): string | null {
  if (!isDateValid(date)) {
    return null;
  }
  const newDate = new Date(date);
  const minutes = newDate.getUTCMinutes();
  const reminder = minutes % 5;
  newDate.setUTCMinutes(minutes - reminder);

  newDate.setUTCSeconds(0);
  newDate.setUTCMilliseconds(0);
  return newDate.toISOString();
}

export function dateRange15min(date: string): string | null {
  if (!isDateValid(date)) {
    return null;
  }
  const newDate = new Date(date);
  const minutes = newDate.getUTCMinutes();
  const reminder = minutes % 15;
  newDate.setUTCMinutes(minutes - reminder);

  newDate.setUTCSeconds(0);
  newDate.setUTCMilliseconds(0);
  return newDate.toISOString();
}

export function dateRange30min(date: string): string | null {
  if (!isDateValid(date)) {
    return null;
  }
  const newDate = new Date(date);
  const minutes = newDate.getUTCMinutes();
  if (minutes >= 30) {
    newDate.setUTCMinutes(30);
  } else {
    newDate.setUTCMinutes(0);
  }
  newDate.setUTCSeconds(0);
  newDate.setUTCMilliseconds(0);
  return newDate.toISOString();
}

export function dateRange1hour(date: string): string | null {
  if (!isDateValid(date)) {
    return null;
  }
  const newDate = new Date(date);
  newDate.setUTCMinutes(0);
  newDate.setUTCSeconds(0);
  newDate.setUTCMilliseconds(0);

  return newDate.toISOString();
}

export function dateRange4hour(date: string): string | null {
  if (!isDateValid(date)) {
    return null;
  }
  const newDate = new Date(date);
  newDate.setUTCMinutes(0);
  newDate.setUTCSeconds(0);
  newDate.setUTCMilliseconds(0);
  newDate.setUTCHours(newDate.getUTCHours() - (newDate.getUTCHours() % 4));

  return newDate.toISOString();
}

export function dateRange1Day(date: string): string | null {
  if (!isDateValid(date)) {
    return null;
  }
  const newDate = new Date(date);
  newDate.setUTCHours(0);
  newDate.setUTCMinutes(0);
  newDate.setUTCSeconds(0);
  newDate.setUTCMilliseconds(0);

  return newDate.toISOString();
}

export type TimeFrame = 'd1' | 'h4' | 'h1' | 'm30' | 'm15' | 'm5';

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
      const minutes = date.getUTCMinutes();
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

export function getTimestamp(n: number) {
  const d = new Date();
  d.setMinutes(d.getMinutes() + n);
  return d.getTime();
}
