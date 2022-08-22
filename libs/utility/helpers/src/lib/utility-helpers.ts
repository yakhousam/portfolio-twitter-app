// this function is made to combine css classes
export function clsx(...args: string[]) {
  return args.join(' ').trim();
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
