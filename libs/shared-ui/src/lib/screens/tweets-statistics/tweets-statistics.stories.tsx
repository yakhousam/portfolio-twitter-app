import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useTheme } from '@yak-twitter-app/shared-lib';
import { TweetsStatistics } from './tweets-statistics';

export default {
  component: TweetsStatistics,
  title: 'screens/TweetsStatistics',
} as ComponentMeta<typeof TweetsStatistics>;

const Template: ComponentStory<typeof TweetsStatistics> = (args) => (
  <TweetsStatistics {...args} />
);

export const Light = Template.bind({});
Light.args = {
  original: 100,
  replay: 400,
  retweet: 200,
};
Light.decorators = [
  (Story) => {
    useTheme('light');
    return <Story />;
  },
];

export const Dark = Template.bind({});
Dark.args = {
  original: 100,
  replay: 400,
  retweet: 200,
};
Dark.decorators = [
  (Story) => {
    useTheme('dark');
    return <Story />;
  },
];
