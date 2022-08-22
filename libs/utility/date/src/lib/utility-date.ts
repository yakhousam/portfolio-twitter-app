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

/**
 * Returns a date in unix timestamp format calculated
 * from current date plus number of seconds "offset" passed as
 * parameter to the function
 * @param offset A numric value
 */
export function getTimestamp(offset: number) {
  const d = new Date();
  d.setSeconds(d.getSeconds() + offset);
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
