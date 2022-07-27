import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  analyzeTweets,
  combineChartData,
  data,
} from '@yak-twitter-app/shared-lib';
import { Chart } from './chart';

export default {
  component: Chart,
  title: 'screens/Chart',
} as ComponentMeta<typeof Chart>;

const Template: ComponentStory<typeof Chart> = (args) => <Chart {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: combineChartData(
    {
      m5: { labels: [], datasets: [] },
      m15: { labels: [], datasets: [] },
      m30: { labels: [], datasets: [] },
      h1: { labels: [], datasets: [] },
      h4: { labels: [], datasets: [] },
      d1: { labels: [], datasets: [] },
    },
    analyzeTweets(data.tweets).chartData
  ),
};
