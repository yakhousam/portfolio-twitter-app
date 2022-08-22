import { ComponentStory, ComponentMeta } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import {
  analyzeTweets,
  getMostEngagedTweets,
  getRankedAccounts,
} from '@yak-twitter-app/utility/tweets';
import { rest } from 'msw';
import { Dashboard } from './dashboard';
import { AppDataProvider } from '@yak-twitter-app/context/use-app-data';
import { getTimestamp } from '@yak-twitter-app/utility/date';
import { getTwitterData } from '@yak-twitter-app/mocks/tweets';

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
          user.id = usersIds[i];
        });
        return res(
          ctx.delay(2000),
          ctx.body(
            JSON.stringify({
              ...analyzeTweets(mockedData.tweets),
              rateLimit: {
                ...mockedData.rateLimit,
                reset: mockedData.rateLimit.reset * 1000, // convert seconds to milliseconds
              },
              rankedAccounts,
              mostEngagedTweets,
            })
          )
        );
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
