export function isDateValid(date: string): boolean {
  const d = new Date(date);
  return !Number.isNaN(d.getTime());
}

export function dateRange5min(date: string): string | null {
  if (!isDateValid(date)) {
    return null;
  }
  const newDate = new Date(date);
  const minutes = newDate.getMinutes();
  const reminder = minutes % 5;
  newDate.setMinutes(minutes - reminder);

  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate.toLocaleString();
}

export function dateRange15min(date: string): string | null {
  if (!isDateValid(date)) {
    return null;
  }
  const newDate = new Date(date);
  const minutes = newDate.getMinutes();
  const reminder = minutes % 15;
  newDate.setMinutes(minutes - reminder);

  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate.toLocaleString();
}

export function dateRange30min(date: string): string | null {
  if (!isDateValid(date)) {
    return null;
  }
  const newDate = new Date(date);
  const minutes = newDate.getMinutes();
  if (minutes >= 30) {
    newDate.setMinutes(30);
  } else {
    newDate.setMinutes(0);
  }
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate.toLocaleString();
}

export function dateRange1hour(date: string): string | null {
  if (!isDateValid(date)) {
    return null;
  }
  const newDate = new Date(date);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate.toLocaleString();
}

export function dateRange4hour(date: string): string | null {
  if (!isDateValid(date)) {
    return null;
  }
  const newDate = new Date(date);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  newDate.setHours(newDate.getHours() - (newDate.getHours() % 4));

  return newDate.toLocaleString();
}

export function dateRange1Day(date: string): string | null {
  if (!isDateValid(date)) {
    return null;
  }
  const newDate = new Date(date);
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate.toLocaleString();
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
/** @param {number} n - number of seconds from now */
export function getTimestamp(n: number) {
  const d = new Date();
  d.setSeconds(d.getSeconds() + n);
  return d.getTime();
}

export function formatDateYYYMMDD(date: Date) {
  return `${date.getFullYear()}-${
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  }-${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}`;
}

export function getDefaultStartDate() {
  const date = new Date();
  date.setDate(date.getDate() - 6);
  return formatDateYYYMMDD(date);
}

export function getDefaultEndDate() {
  const date = new Date();
  return formatDateYYYMMDD(date);
}
