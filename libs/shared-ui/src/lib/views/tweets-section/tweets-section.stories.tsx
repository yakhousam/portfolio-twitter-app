import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useTheme } from '@yak-twitter-app/shared-lib';
import { TweetsSection } from './tweets-section';

export default {
  component: TweetsSection,
  title: 'views/TweetsSection',
} as ComponentMeta<typeof TweetsSection>;

const Template: ComponentStory<typeof TweetsSection> = (args) => (
  <TweetsSection {...args} />
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
