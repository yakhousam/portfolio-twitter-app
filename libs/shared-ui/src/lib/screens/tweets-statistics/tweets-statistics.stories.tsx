import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TweetsStatistics } from './tweets-statistics';

export default {
  component: TweetsStatistics,
  title: 'screens/TweetsStatistics',
} as ComponentMeta<typeof TweetsStatistics>;

const Template: ComponentStory<typeof TweetsStatistics> = (args) => (
  <TweetsStatistics {...args} />
);

export const Default = Template.bind({});
Default.args = {
  original: 100,
  replay: 400,
  retweet: 200,
};
