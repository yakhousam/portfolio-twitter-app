import axios from 'axios';
import { rest } from 'msw';
import { server as mockServer } from '@yak-twitter-app/mocks/server';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { server } from 'apps/server/src/main';
import { sleep } from '@yak-twitter-app/utility/helpers';
import { dumyData, page } from '@yak-twitter-app/mocks/server';
import { getTimestamp } from '@yak-twitter-app/utility/date';

jest.mock('@yak-twitter-app/utility/helpers', () => {
  return {
    sleep: jest.fn(() => Promise.resolve()),
  };
});

// TODO: fix route test
describe('testing routes', () => {
  beforeAll(() => {
    // server.listen();
    mockServer.listen();
  });
  afterAll(() => {
    server.close();
    mockServer.close();
  });
  test("get 'api/search/hashtag/:hashtag' endpoint should return json object ", async () => {
    mockServer.use(
      rest.get(
        'https://api.twitter.com/2/tweets/search/recent',
        (req, res, ctx) => {
          return res(ctx.json(dumyData[page[5]]));
        }
      )
    );
    const { data } = await axios.get(
      'http://localhost:3333/api/search/hashtag/bitcoin'
    );
    expect(data).toHaveProperty('original');
    expect(data).toHaveProperty('replay');
    expect(data).toHaveProperty('retweet');
    expect(data).toHaveProperty('rateLimit');
    expect(data).toHaveProperty('rankedAccounts');
    expect(data).toHaveProperty('mostEngagedTweets');
  });

  test('should pause feetching tweets when rate limit is zero', async () => {
    mockServer.use(
      rest.get(
        'https://api.twitter.com/2/tweets/search/recent',
        (req, res, ctx) => {
          return res(
            ctx.set('x-rate-limit-limit', '450'),
            ctx.set('x-rate-limit-remaining', '0'),
            ctx.set('x-rate-limit-reset', String(getTimestamp(15) / 1000)),
            ctx.json(dumyData[page[5]])
          );
        }
      )
    );
    await axios.get('http://localhost:3333/api/search/hashtag/bitcoin');
    expect(sleep).toHaveBeenCalledTimes(1);
  });

  test('should fetch all the pages until done is true', async () => {
    let next_token: string;
    mockServer.use(
      rest.get(
        'https://api.twitter.com/2/tweets/search/recent',
        (req, res, ctx) => {
          // the first time we call twitter search recent, next_token is always undefined
          // I have 5 pages, the first time I return the page 1
          next_token = req.url.searchParams.get('next_token') || page[1];
          return res(ctx.json(dumyData[next_token]));
        }
      )
    );
    await axios.get('http://localhost:3333/api/search/hashtag/bitcoin');
    expect(next_token).toBe(page[5]);
  });

  test('should return status 429 if it exceeds the rate limit ', async () => {
    mockServer.use(
      rest.get(
        'https://api.twitter.com/2/tweets/search/recent',
        (req, res, ctx) => {
          return res(
            ctx.status(429),
            ctx.body(
              JSON.stringify({
                errors: [{ code: 88, message: 'Rate limit exceeded' }],
              })
            )
          );
        }
      )
    );
    try {
      await axios.get('http://localhost:3333/api/search/hashtag/bitcoin');
    } catch (error) {
      expect(error.response.status).toBe(429);
    }
  });

  test('should return handle headersent error ', async () => {
    let count = 0;
    mockServer.use(
      rest.get(
        'https://api.twitter.com/2/tweets/search/recent',
        (req, res, ctx) => {
          if (count < 1) {
            count++;
            return res(ctx.json(dumyData[page[1]]));
          }
          return res(
            ctx.status(429),
            ctx.body(
              JSON.stringify({
                errors: [{ code: 88, message: 'Rate limit exceeded' }],
              })
            )
          );
        }
      )
    );
    try {
      const response = await axios.get(
        'http://localhost:3333/api/search/hashtag/bitcoin'
      );
      console.log(response.headers);
    } catch (error) {
      console.log(error.response);
    }
  });
});
