import { ComponentStory, ComponentMeta } from '@storybook/react';
import { getTimestamp, useTheme } from '@yak-twitter-app/shared-lib';
import { RateLimit } from './rate-limit-section';

export default {
  component: RateLimit,
  title: 'views/RateLimit',
} as ComponentMeta<typeof RateLimit>;

const Template: ComponentStory<typeof RateLimit> = (args) => (
  <RateLimit {...args} />
);

export const Light = Template.bind({});
Light.decorators = [
  (Story) => {
    useTheme('light');
    return <Story />;
  },
];
Light.args = {
  rateLimit: { limit: 450, remaining: 448, reset: getTimestamp(15) },
};

export const Dark = Template.bind({});
Dark.decorators = [
  (Story) => {
    useTheme('dark');
    return <Story />;
  },
];

Dark.args = {
  rateLimit: { limit: 450, remaining: 448, reset: getTimestamp(15) },
};
