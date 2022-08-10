import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  analyzeTweets,
  data as mockedData,
  getMostEngagedTweets,
  getRankedAccounts,
} from '@yak-twitter-app/shared-lib';
import { rest } from 'msw';
import { AppDataProvider } from '../../context/use-app-data/use-app-data';
import { Dashboard } from './dashboard';

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
        return res(
          ctx.json({
            ...analyzeTweets(mockedData.tweets),
            rateLimit: {
              ...mockedData.rateLimit,
              reset: mockedData.rateLimit.reset * 1000, // convert seconds to milliseconds
            },
            rankedAccounts: getRankedAccounts(mockedData.includes.users),
            mostEngagedTweets: getMostEngagedTweets(mockedData.tweets),
          })
        );
      }),
    ],
  },
};
