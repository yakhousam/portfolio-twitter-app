import { ComponentStory, ComponentMeta } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import {
  getTweetsStats,
  getMostEngagedTweets,
  getRankedAccounts,
} from '@yak-twitter-app/utility/tweets';
import { rest } from 'msw';
import { Dashboard } from './dashboard';
import { AppDataProvider } from '@yak-twitter-app/context/use-app-data';
import { getTimestamp } from '@yak-twitter-app/utility/date';
import { SearchHashtagReturnData } from '@yak-twitter-app/types';
import { sleep } from '@yak-twitter-app/utility/helpers';
import { TweetV2 } from 'twitter-api-v2';
import { dumyData, pageByToken } from '@yak-twitter-app/mocks/msw-data';

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

export const ErrorWhileSearching = Template.bind({});

ErrorWhileSearching.parameters = {
  msw: {
    handlers: [
      rest.get('/api/search/hashtag/:id', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(429),
          ctx.json({ status: 429, message: 'too many requests' })
        );
      }),
    ],
  },
};

ErrorWhileSearching.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByRole('searchbox'), 'JavaScript');
  const searchButton = canvas.getByLabelText('search');
  await userEvent.click(searchButton);
  await sleep(1000);
  await expect(await canvas.findByTestId('error')).toBeInTheDocument();
};

export const CancelWhileSearching = Template.bind({});

CancelWhileSearching.parameters = {
  msw: {
    handlers: [
      rest.get('/api/search/hashtag/:id', (req, res, ctx) => {
        const nextToken = req.url.searchParams.get('nextToken');
        const result = dumyData[nextToken || '0'];
        const response: SearchHashtagReturnData = {
          ...getTweetsStats(result.data.data as TweetV2[]),
          rateLimit: {
            limit: 180,
            remaining: 180 - pageByToken[nextToken || '0'],
            reset: getTimestamp(60 * 15),
          },
          rankedAccounts: getRankedAccounts(result.data.includes.users),
          mostEngagedTweets: getMostEngagedTweets(
            result.data.data as TweetV2[]
          ),
          chartData: result.data.data.map((tweet) => tweet.created_at),
          nextToken: result.data.meta.next_token,
        };
        return res(ctx.delay(), ctx.json(response));
      }),
    ],
  },
};

CancelWhileSearching.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByRole('searchbox'), 'JavaScript');
  await userEvent.click(canvas.getByLabelText('search'));
  await sleep(1000);
  await userEvent.click(canvas.getByRole('button', { name: 'cancel' }));
  await expect(await canvas.findByLabelText('search')).toBeInTheDocument();
};

export const Default = Template.bind({});

Default.parameters = { ...CancelWhileSearching.parameters };

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByRole('searchbox'), 'JavaScript');
  const searchButton = canvas.getByLabelText('search');
  await userEvent.click(searchButton);
  await expect(
    await canvas.findByRole('button', { name: /cancel/i })
  ).toBeInTheDocument();
};
