import { ComponentStory, ComponentMeta } from '@storybook/react';
import { analyzeTweets, data, useTheme } from '@yak-twitter-app/shared-lib';
import { ChartSection } from './chart-section';

export default {
  component: ChartSection,
  title: 'views/ChartSection',
} as ComponentMeta<typeof ChartSection>;

const Template: ComponentStory<typeof ChartSection> = (args) => (
  <ChartSection {...args} />
);

export const Light = Template.bind({});
Light.args = {
  data: analyzeTweets(data.tweets).chart,
};
Light.decorators = [
  (Story) => {
    useTheme('light');
    return <Story />;
  },
];

export const Dark = Template.bind({});
Dark.args = {
  data: analyzeTweets(data.tweets).chart,
};
Dark.decorators = [
  (Story) => {
    useTheme('dark');
    return <Story />;
  },
];
