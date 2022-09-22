import { dumyData, page } from '@yak-twitter-app/mocks/msw-data';
import { SearchHashtagReturnData } from '@yak-twitter-app/types';
import { getTimestamp } from '@yak-twitter-app/utility/date';
import {
  getMostEngagedTweets,
  getRankedAccounts,
  getTweetsStats,
} from '@yak-twitter-app/utility/tweets';
import { TweetV2 } from 'twitter-api-v2';

// import { getGreeting } from '../support/app.po';

describe('dashboard', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    // getGreeting().contains('twitter hashtag analyzer');

    cy.findByRole('heading', { level: 1, name: /twitter hashtag analyzer/ });
  });
  it.only(`sould fetch the data`, () => {
    const result = dumyData[page['49']];
    const response: SearchHashtagReturnData = {
      ...getTweetsStats(result.data.data as TweetV2[]),
      rateLimit: {
        limit: 180,
        remaining: 179,
        reset: getTimestamp(60 * 15),
      },
      rankedAccounts: getRankedAccounts(result.data.includes.users),
      mostEngagedTweets: getMostEngagedTweets(result.data.data as TweetV2[]),
      chartData: result.data.data.map((tweet) => tweet.created_at),
      nextToken: result.data.meta.next_token,
    };
    cy.intercept('/api/search/hashtag/*', response);

    cy.findByRole('searchbox').type('typescript');
    cy.findByLabelText('search').click();
  });
});
