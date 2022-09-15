import { Server } from 'http';
import axios from 'axios';
import { rest } from 'msw';
import { server as mockServer } from '@yak-twitter-app/mocks/server';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { app } from '@yak-twitter-app/server/app';

const PORT = 5002;
describe('error middleware', () => {
  let server: Server;
  beforeAll((done) => {
    server = app.listen(PORT, () => done());
    mockServer.listen({
      onUnhandledRequest: 'bypass',
    });
  });
  afterAll(() => {
    server.close();
    mockServer.close();
  });

  test('should return status error 400 if api request error', async () => {
    try {
      await axios.get(
        `http://localhost:${PORT}/api/search/hashtag/javascript`,
        {
          params: {
            nextToken: '',
          },
        }
      );
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test('should return status 429 if it exceeds the rate limit ', async () => {
    mockServer.use(
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
