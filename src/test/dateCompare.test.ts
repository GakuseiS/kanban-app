import { isDateInPast } from '../utils/dateCompare';

describe('isDateInPast', () => {
  test('checks if 01.01.2000 in past', () => {
    const dateInPast = new Date(2000, 1, 1);
    expect(isDateInPast(dateInPast)).toBe(true);
  });
  test('checks if 01.01.3000 in past', () => {
    const dateInFuture = new Date(3000, 1, 1);
    expect(isDateInPast(dateInFuture)).toBe(false);
  });
});
