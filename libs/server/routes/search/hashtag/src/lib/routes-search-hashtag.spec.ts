import { Server } from 'http';
import axios from 'axios';
import { rest } from 'msw';
import { server as mockServer } from '@yak-twitter-app/mocks/server';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { app } from '@yak-twitter-app/server/app';
import { dumyData, page } from '@yak-twitter-app/mocks/server';

jest.setTimeout(1000 * 20);

jest.mock('@yak-twitter-app/utility/helpers', () => {
  return {
    sleep: jest.fn(() => Promise.resolve()),
  };
});

const PORT = 5001;
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
  test("get 'api/search/hashtag/:hashtag' endpoint should return status 200 ", async () => {
    mockServer.use(
      rest.get(
        'https://api.twitter.com/2/tweets/search/recent',
        (req, res, ctx) => {
          return res(ctx.json(dumyData[page[5]]));
        }
      )
    );
    const response = await axios.get(
      `http://localhost:${PORT}/api/search/hashtag/javascript`
    );
    expect(response.status).toBe(200);
  });
});
