import { DateTime } from "luxon";

const START_DATE = DateTime.fromObject({ year: 2025, month: 1, day: 1 });

export function getIndexToday(arrayLength: unknown[] | number): number {
  const max = Array.isArray(arrayLength) ? arrayLength.length : arrayLength;
  const today = DateTime.now();
  const days = today.diff(START_DATE, "day").days;
  const index = Math.floor(days) % max;
  return index;
}
