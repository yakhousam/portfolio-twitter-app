import { ComponentStory, ComponentMeta } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import {
  getTweetsStats,
  getMostEngagedTweets,
  getRankedAccounts,
} from '@yak-twitter-app/utility/tweets';
import { rest } from 'msw';
import { Dashboard } from './dashboard';
import { AppDataProvider } from '@yak-twitter-app/context/use-app-data';
import { getTimestamp } from '@yak-twitter-app/utility/date';
import { getTwitterData } from '@yak-twitter-app/mocks/tweets';
import { SearchHashtagReturnData } from '@yak-twitter-app/types';

export default {
  component: Dashboard,
  title: 'pages/Dashboard',
  decorators: [
    (Story) => (
      <AppDataProvider>
        <Story />
      </AppDataProvider>
    ),
  ],
} as ComponentMeta<typeof Dashboard>;

const Template: ComponentStory<typeof Dashboard> = (args) => {
  return <Dashboard />;
};

export const Default = Template.bind({});

Default.parameters = {
  msw: {
    handlers: [
      rest.get('/api/search/hashtag/:id', (req, res, ctx) => {
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
        const users = [
          'yksamir',
          'javascript',
          'reactjs',
          'nodejs',
          'typescript',
          'fbjest',
        ];
        const mockedData = getTwitterData({
          startDate,
          endDate,
          reset: getTimestamp(15) / 1000,
          maxResult: 500,
        });
        const rankedAccounts = getRankedAccounts(mockedData.includes.users);
        const mostEngagedTweets = getMostEngagedTweets(mockedData.tweets);
        mostEngagedTweets.forEach((tweet, i) => {
          tweet.id = tweetsIds[i];
        });
        rankedAccounts.forEach((user, i) => {
          user.username = users[i];
        });
        const response: SearchHashtagReturnData = {
          ...getTweetsStats(mockedData.tweets),
          rateLimit: {
            ...mockedData.rateLimit,
            reset: mockedData.rateLimit.reset * 1000, // convert seconds to milliseconds
          },
          rankedAccounts,
          mostEngagedTweets,
          chartData: mockedData.tweets.map((tweet) => tweet.created_at),
        };
        return res(ctx.delay(2000), ctx.body(JSON.stringify(response)));
      }),
    ],
  },
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByRole('searchbox'), 'JavaScript');
  const searchButton = canvas.getByLabelText('search');
  await userEvent.click(searchButton);
  await canvas.findByRole('button', { name: /cancel/i });
};
