import { Server } from 'http';
import * as express from 'express';
import axios from 'axios';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { searchHashtagRoute } from '@yak-twitter-app/server-routes-search-hashtag';
import { errorMiddleware } from './middlewares-error';

const mockTwitterApi = setupServer();

const PORT = 5002;
describe('error middleware', () => {
  let server: Server;
  beforeAll((done) => {
    process.env.TWITTER_CONSUMER_KEY = 'my_consumer_key';
    process.env.TWITTER_CONSUMER_SECRET = 'my_consumer_secret';
    const app = express();
    app.use('/api/search/hashtag', searchHashtagRoute);
    app.use(errorMiddleware);
    server = app.listen(PORT, () => done());
    mockTwitterApi.listen({
      onUnhandledRequest: 'bypass',
    });
  });
  afterAll(() => {
    server.close();
    mockTwitterApi.close();
  });

  test('should return status error 400 if api request error', async () => {
    mockTwitterApi.use(
      rest.get(
        'https://api.twitter.com/2/tweets/search/recent',
        (req, res, ctx) => {
          return res(ctx.status(400));
        }
      )
    );
    try {
      await axios.get(
        `http://localhost:${PORT}/api/search/hashtag/javascript`,
        {
          params: {
            endDate: 'something',
          },
        }
      );
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test('should return status 429 if it exceeds the rate limit ', async () => {
    mockTwitterApi.use(
      rest.get(
        'https://api.twitter.com/2/tweets/search/recent',
        (req, res, ctx) => {
          return res(
            ctx.status(429),
            ctx.json({ error: { code: 88, message: 'Rate limit exceeded' } })
          );
        }
      )
    );
    try {
      await axios.get(`http://localhost:${PORT}/api/search/hashtag/javascript`);
    } catch (error) {
      expect(error.response.status).toBe(429);
    }
  });
});
