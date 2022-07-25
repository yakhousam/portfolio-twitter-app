import { ComponentStory, ComponentMeta } from '@storybook/react';
import { analyzeTweets, data, useTheme } from '@yak-twitter-app/shared-lib';
import { Chart } from './chart';

export default {
  component: Chart,
  title: 'screens/Chart',
} as ComponentMeta<typeof Chart>;

const Template: ComponentStory<typeof Chart> = (args) => <Chart {...args} />;

export const Light = Template.bind({});
// Light.args = {
//   data: analyzeTweets(data.tweets).chart,
// };
// Light.decorators = [
//   (Story) => {
//     useTheme('light');
//     return <Story />;
//   },
// ];

// export const Dark = Template.bind({});
// Dark.args = {
//   data: analyzeTweets(data.tweets).chart,
// };
// Dark.decorators = [
//   (Story) => {
//     useTheme('dark');
//     return <Story />;
//   },
// ];
