// this function is for combining css classes
export function clsx(...args: string[]) {
  return args.join(' ').trim();
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isValidJSON(json: string) {
  try {
    JSON.parse(json);
    return true;
  } catch (error) {
    return false;
  }
}

export function getCookieValue(cookie: string): string | undefined {
  // from MDN
  return window.document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${cookie}=`))
    ?.split('=')[1];
}
