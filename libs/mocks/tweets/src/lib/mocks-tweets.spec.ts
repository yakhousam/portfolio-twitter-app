import { mocksTweets } from './mocks-tweets';

describe('mocksTweets', () => {
  it('should work', () => {
    expect(mocksTweets()).toEqual('mocks-tweets');
  });
});
