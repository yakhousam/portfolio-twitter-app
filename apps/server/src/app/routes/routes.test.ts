// import fetch from "node-fetch";
import axios from 'axios';
import { server } from '../../main';

describe('testing routes', () => {
  afterAll(() => server.close());

  test("get 'api/search/:hashtag' endpoint should return json object ", async () => {
    const { data } = await axios.get(
      'http://localhost:3333/api/search/bitcoin?maxResults=100'
    );
    expect(data).toHaveProperty('original');
    expect(data).toHaveProperty('replay');
    expect(data).toHaveProperty('retweet');
    expect(data).toHaveProperty('chart');
    expect(data).toHaveProperty('rateLimit');
    expect(data).toHaveProperty('topFiveUsers');
  });
});
