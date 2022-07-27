import { ComponentStory, ComponentMeta } from '@storybook/react';
import { getTimestamp } from '@yak-twitter-app/shared-lib';
import { RateLimit } from './rate-limit';

export default {
  component: RateLimit,
  title: 'screens/RateLimit',
  argTypes: {
    dispatch: { action: 'onTimerEnd' },
  },
} as ComponentMeta<typeof RateLimit>;

const Template: ComponentStory<typeof RateLimit> = (args) => (
  <RateLimit {...args} />
);

export const Default = Template.bind({});

Default.args = {
  rateLimit: { limit: 450, remaining: 448, reset: getTimestamp(10) },
};
