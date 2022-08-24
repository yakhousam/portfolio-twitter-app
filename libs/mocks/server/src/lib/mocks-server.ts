import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { dumyData } from './data';

export const server = setupServer(
  rest.get(
    'https://api.twitter.com/2/tweets/search/recent',
    (req, res, ctx) => {
      const next_token = req.url.searchParams.get('next_token');
      return res(ctx.json(next_token ? dumyData[next_token] : dumyData['0']));
    }
  )
);
