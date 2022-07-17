import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useTheme } from '@yak-twitter-app/shared-lib';
import { TweetsStatisticsSection } from './tweets-statistics-section';

export default {
  component: TweetsStatisticsSection,
  title: 'views/TweetsStatisticsSection',
} as ComponentMeta<typeof TweetsStatisticsSection>;

const Template: ComponentStory<typeof TweetsStatisticsSection> = (args) => (
  <TweetsStatisticsSection {...args} />
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
