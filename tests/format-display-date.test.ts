import { describe, expect, it } from 'vitest';
import { formatDisplayDate, toValidDate } from '../utils/format-display-date';

describe('formatDisplayDate', () => {
  it('formats the date string used by the purchase flow', () => {
    expect(formatDisplayDate('04 Sep, 2026')).toBe('04 Sep 2026');
  });

  it('formats ISO dates and Date values', () => {
    expect(formatDisplayDate('2028-01-15T00:00:00.000Z')).toBe('15 Jan 2028');
    expect(formatDisplayDate(new Date('2028-01-15T00:00:00.000Z'))).toBe('15 Jan 2028');
  });

  it('returns a fallback for missing and invalid values', () => {
    expect(formatDisplayDate(undefined)).toBe('N/A');
    expect(formatDisplayDate('not-a-date', 'Unknown')).toBe('Unknown');
    expect(toValidDate(new Date('invalid'))).toBeNull();
  });
});