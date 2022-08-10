import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  analyzeTweets,
  getTwitterData,
  getMostEngagedTweets,
  getRankedAccounts,
} from '@yak-twitter-app/shared-lib';
import { rest } from 'msw';
import { Dashboard } from './dashboard';

export default {
  component: Dashboard,
  title: 'pages/Dashboard',
} as ComponentMeta<typeof Dashboard>;

const Template: ComponentStory<typeof Dashboard> = (args) => {
  return <Dashboard />;
};

export const Default = Template.bind({});

Default.parameters = {
  msw: {
    handlers: [
      rest.get('/api/search/:id', (req, res, ctx) => {
        const startDate = req.url.searchParams.get('startTime');
        const endDate = req.url.searchParams.get('endTime');
        if (!startDate || !endDate) {
          return res(ctx.status(400));
        }
        const tweetsIds = [
          '1545260483980234753',
          '1545260274726453248',
          '1545260256636424194',
          '1545259630015774722',
          '1545258875993133056',
          '1545258356834721793',
        ];
        const usersIds = [
          '1000814755664150528',
          '710123736175783938',
          '1098126456276828160',
          '2704581690',
          '1354693765940846594',
          '1142424032794406912',
        ];
        const mockedData = getTwitterData({ startDate, endDate });
        const rankedAccounts = getRankedAccounts(mockedData.includes.users);
        const mostEngagedTweets = getMostEngagedTweets(mockedData.tweets);
        mostEngagedTweets.forEach((tweet, i) => {
          console.log('tweet index =', i);
          tweet.id = tweetsIds[i];
        });
        rankedAccounts.forEach((user, i) => {
          user.id = usersIds[i];
        });
        return res(
          ctx.delay(1000),
          ctx.json({
            ...analyzeTweets(mockedData.tweets),
            rateLimit: {
              ...mockedData.rateLimit,
              reset: mockedData.rateLimit.reset * 1000, // convert seconds to milliseconds
            },
            rankedAccounts,
            mostEngagedTweets,
          })
        );
      }),
    ],
  },
};
