const MILLISECONDS_PER_MINUTE = 60_000;

export const daysToMilliseconds = (days: number): number =>
  MILLISECONDS_PER_MINUTE * 60 * 24 * days;
