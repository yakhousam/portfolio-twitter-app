import { Server } from 'http';
import axios from 'axios';
import { rest } from 'msw';
import { server as mockServer } from '@yak-twitter-app/mocks/server';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { app } from '@yak-twitter-app/server/app';
import { dumyData, page } from '@yak-twitter-app/mocks/server';

const PORT = 5002;
describe('testing routes', () => {
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
      await axios.get(`http://localhost:${PORT}/api/search/hashtag/javascript`);
    } catch (error) {
      expect(error.response.status).toBe(429);
    }
  });

  test('should return "error_streaming" when error happend after headers sent ', async () => {
    let count = 0;
    mockServer.use(
      rest.get(
        'https://api.twitter.com/2/tweets/search/recent',
        (req, res, ctx) => {
          if (count < 1) {
            count++;
            return res(ctx.json(dumyData[page[1]]));
          }
          return res(ctx.status(500));
        }
      )
    );
    const { data } = await axios.get(
      `http://localhost:${PORT}/api/search/hashtag/javascript`
    );
    expect(data).toMatch(/error_streaming/i);
  });
});
