import { isValidJSON } from './utility-helpers';

describe('isValidJSON', () => {
  it('should return true if valid json', () => {
    const validJSON = JSON.stringify({ a: 1, b: 2 });
    expect(isValidJSON(validJSON)).toBe(true);
  });
  it('should return false for none valid json', () => {
    const noValidJSON = '{"a":1,"b":2';
    expect(isValidJSON(noValidJSON)).toBe(false);
  });
});
