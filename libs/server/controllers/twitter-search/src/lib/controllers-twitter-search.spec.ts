import * as express from 'express';
import { Server } from 'http';
import axios from 'axios';
import { rest } from 'msw';
import { dumyData, page } from '@yak-twitter-app/mocks/msw-data';
import { setupServer } from 'msw/node';
import { searchByHashtag, SearchRequest } from './controllers-twitter-search';

const mockTwitterApi = setupServer();

jest.setTimeout(1000 * 20);

const PORT = 5003;
describe('testing routes', () => {
  let server: Server;
  beforeAll((done) => {
    process.env.TWITTER_CONSUMER_KEY = 'my_consumer_key';
    process.env.TWITTER_CONSUMER_SECRET = 'my_consumer_secret';
    const app = express();
    app.use('/api/search/hashtag', (req: SearchRequest, res, next) =>
      searchByHashtag(req, res, next)
    );
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
          return res(
            ctx.set(
              'x-rate-limit-limit',
              dumyData['0'].headers['x-rate-limit-limit']
            ),
            ctx.set(
              'x-rate-limit-remaining',
              dumyData['0'].headers['x-rate-limit-remaining']
            ),
            ctx.set(
              'x-rate-limit-reset',
              dumyData['0'].headers['x-rate-limit-reset']
            ),
            ctx.json({
              ...dumyData['0'].data,
            })
          );
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

  test('should fetch next page if nextToken is defined', async () => {
    let next_token: string;
    mockTwitterApi.use(
      rest.get(
        'https://api.twitter.com/2/tweets/search/recent',
        (req, res, ctx) => {
          // the first time we call twitter search recent, next_token is always undefined
          // I have 5 pages, to speed up the test, I start from page 3
          next_token = req.url.searchParams.get('next_token');
          return res(
            ctx.set(
              'x-rate-limit-limit',
              dumyData[next_token].headers['x-rate-limit-limit']
            ),
            ctx.set(
              'x-rate-limit-remaining',
              dumyData[next_token].headers['x-rate-limit-remaining']
            ),
            ctx.set(
              'x-rate-limit-reset',
              dumyData[next_token].headers['x-rate-limit-reset']
            ),
            ctx.json({
              ...dumyData[next_token].data,
            })
          );
        }
      )
    );
    const { data } = await axios.get(
      `http://localhost:${PORT}/api/search/hashtag/javascript`,
      {
        params: {
          nextToken: page[3],
        },
      }
    );
    expect(next_token).toBe(page[3]);
    expect(data.nextToken).toBe(page[4]);
  });
});
