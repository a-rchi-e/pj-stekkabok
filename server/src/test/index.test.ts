import startServer from '../index';

describe('testing index file', () => {
  test('empty string should result in zero', () => {
    expect(startServer('')).toBe(0);
  });
});

