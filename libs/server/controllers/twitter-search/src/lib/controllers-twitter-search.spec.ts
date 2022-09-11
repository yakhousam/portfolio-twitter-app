import { Server } from 'http';
import axios from 'axios';
import { rest } from 'msw';
import { server as mockTwitterApi } from '@yak-twitter-app/mocks/server';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { app } from '@yak-twitter-app/server/app';
import { sleep } from '@yak-twitter-app/utility/helpers';
import { dumyData, page } from '@yak-twitter-app/mocks/server';
import { getTimestamp } from '@yak-twitter-app/utility/date';

jest.setTimeout(1000 * 20);

jest.mock('@yak-twitter-app/utility/helpers', () => {
  return {
    sleep: jest.fn(() => Promise.resolve()),
  };
});

const PORT = 5003;
describe('testing routes', () => {
  let server: Server;
  beforeAll((done) => {
    server = app.listen(PORT, () => done());
    mockTwitterApi.listen({
      onUnhandledRequest: 'bypass',
    });
  });
  afterAll(() => {
    server.close();
    mockTwitterApi.close();
  });
  test("get 'api/search/hashtag/:hashtag' endpoint should return json object ", async () => {
    mockTwitterApi.use(
      rest.get(
        'https://api.twitter.com/2/tweets/search/recent',
        (req, res, ctx) => {
          return res(ctx.json(dumyData[page[5]]));
        }
      )
    );
    const { data } = await axios.get(
      `http://localhost:${PORT}/api/search/hashtag/javascript`
    );
    expect(data).toHaveProperty('original');
    expect(data).toHaveProperty('replay');
    expect(data).toHaveProperty('retweet');
    expect(data).toHaveProperty('rateLimit');
    expect(data).toHaveProperty('rankedAccounts');
    expect(data).toHaveProperty('mostEngagedTweets');
  });

  test('should fetch all the pages until done is true', async () => {
    let next_token: string;
    mockTwitterApi.use(
      rest.get(
        'https://api.twitter.com/2/tweets/search/recent',
        (req, res, ctx) => {
          // the first time we call twitter search recent, next_token is always undefined
          // I have 5 pages, to speed up the test, I start from page 3
          next_token = req.url.searchParams.get('next_token') || page[3];
          return res(ctx.json(dumyData[next_token]));
        }
      )
    );
    await axios.get(`http://localhost:${PORT}/api/search/hashtag/javascript`);
    expect(next_token).toBe(page[5]);
  });

  test('should pause feetching  when rate limit reach zero', async () => {
    mockTwitterApi.use(
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
    await axios.get(`http://localhost:${PORT}/api/search/hashtag/javascript`);
    expect(sleep).toHaveBeenCalledTimes(1);
  });
});
