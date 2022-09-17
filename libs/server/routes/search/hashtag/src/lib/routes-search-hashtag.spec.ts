import * as express from 'express';
import { Server } from 'http';
import axios from 'axios';
import { rest } from 'msw';
import { dumyData } from '@yak-twitter-app/mocks/msw-data';
import { setupServer } from 'msw/node';
import { default as searchHashtagRoute } from './routes-search-hashtag';

const mockTwitterApi = setupServer();

jest.setTimeout(1000 * 20);

const PORT = 5001;
describe('testing routes', () => {
  let server: Server;
  beforeAll((done) => {
    process.env.TWITTER_CONSUMER_KEY = 'my_consumer_key';
    process.env.TWITTER_CONSUMER_SECRET = 'my_consumer_secret';
    const app = express();
    app.use('/api/search/hashtag', searchHashtagRoute);
    server = app.listen(PORT, () => done());
    mockTwitterApi.listen({
      onUnhandledRequest: 'bypass',
    });
  });
  afterAll(() => {
    server.close();
    mockTwitterApi.close();
  });
  test("get 'api/search/hashtag/:hashtag' endpoint should return status 200 ", async () => {
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
    const response = await axios.get(
      `http://localhost:${PORT}/api/search/hashtag/javascript`
    );
    expect(response.status).toBe(200);
  });
});
