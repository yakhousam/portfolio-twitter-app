import 'whatwg-fetch';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { act, renderHook } from '@testing-library/react';

import { useSearchHashtag } from './use-search-hashtag';

const server = setupServer(
  rest.get('/api/search/hashtag/:hashtag', (req, res, ctx) => {
    return res(ctx.json({ message: 'hello world' }));
  })
);

describe('useSearch', () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  afterAll(() => {
    server.close();
  });
  it('should render successfully', async () => {
    const { result } = renderHook(() => useSearchHashtag());
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);
    const endDate = new Date();

    let response;
    await act(async () => {
      response = await result.current.searchHashtag({
        hashtag: 'hello',
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
    });
    console.log('response =', response);
  });
});
