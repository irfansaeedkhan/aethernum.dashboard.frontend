import { format, isValid, parse, parseISO } from 'date-fns';

const displayFormats = ['dd MMM, yyyy', 'dd MMM yyyy'];

export const toValidDate = (value: unknown): Date | null => {
  if (value instanceof Date) return isValid(value) ? value : null;
  if (typeof value !== 'string' || !value.trim()) return null;

  const isoDate = parseISO(value);
  if (isValid(isoDate)) return isoDate;

  for (const dateFormat of displayFormats) {
    const displayDate = parse(value, dateFormat, new Date());
    if (isValid(displayDate)) return displayDate;
  }

  return null;
};

export const formatDisplayDate = (value: unknown, fallback = 'N/A'): string => {
  const date = toValidDate(value);
  return date ? format(date, 'dd MMM yyyy') : fallback;
};
