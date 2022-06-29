export function getDefaultEndTime() {
  const today = new Date();
  today.setSeconds(today.getSeconds() - 30);
  return today.toISOString();
}
export function getDefaultStartTime() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
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
  const minutes = newDate.getMinutes();
  const reminder = minutes % 5;
  newDate.setMinutes(minutes - reminder);

  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate.toISOString();
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
  return newDate.toISOString();
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
  return newDate.toISOString();
}

export function dateRange1hour(date: string): string | null {
  if (!isDateValid(date)) {
    return null;
  }
  const newDate = new Date(date);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate.toISOString();
}

export function dateRange4hour(date: string): string | null {
  if (!isDateValid(date)) {
    return null;
  }
  const newDate = new Date(date);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  newDate.setUTCHours(newDate.getUTCHours() - (newDate.getUTCHours() % 4));

  return newDate.toISOString();
}

export function dateRange1Day(date: string): string | null {
  if (!isDateValid(date)) {
    return null;
  }
  const newDate = new Date(date);
  newDate.setUTCHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate.toISOString();
}
