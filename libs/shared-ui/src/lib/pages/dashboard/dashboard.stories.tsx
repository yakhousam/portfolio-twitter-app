import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  analyzeTweets,
  combineChartData,
  data,
  getMostEngagedTweets,
  getRankedAccounts,
  initialState,
  State,
} from '@yak-twitter-app/shared-lib';
import { Dashboard } from './dashboard';

export default {
  component: Dashboard,
  title: 'pages/Dashboard',
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    dispatch: { action: 'dispatch' },
  },
} as ComponentMeta<typeof Dashboard>;

const Template: ComponentStory<typeof Dashboard> = (args) => {
  return <Dashboard {...args} />;
};

export const Idle = Template.bind({});
Idle.args = {
  state: initialState,
};

const { chartData, original, replay, retweet } = analyzeTweets(data.tweets);
const rankedAccounts = getRankedAccounts(data.includes.users);
const mostEngagedTweets = getMostEngagedTweets(data.tweets);
const stateData: State['data'] = {
  original,
  replay,
  retweet,
  chart: combineChartData(initialState.data.chart, chartData),
  rateLimit: {
    ...data.rateLimit,
    reset: data.rateLimit.reset * 1000,
  },
  rankedAccounts,
  mostEngagedTweets,
  mostFollowedAccountIds: [
    '1000814755664150528',
    '710123736175783938',
    '1098126456276828160',
    '2704581690',
    '1354693765940846594',
    '1142424032794406912',
  ],
  mostEngagedTweetsIds: [
    '1545260483980234753',
    '1545260274726453248',
    '1545260256636424194',
    '1545259630015774722',
    '1545258875993133056',
    '1545258356834721793',
  ],
};

export const Receiving = Template.bind({});
Receiving.args = {
  state: {
    data: stateData,
    status: 'receiving',
  },
};

export const Resolved = Template.bind({});
Resolved.args = {
  state: {
    data: stateData,
    status: 'resolved',
  },
};
