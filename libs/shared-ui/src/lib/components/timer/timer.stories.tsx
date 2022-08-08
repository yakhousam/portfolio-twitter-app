import { ComponentStory, ComponentMeta } from '@storybook/react';
import { getTimestamp } from '@yak-twitter-app/shared-lib';
import { Timer } from './timer';

export default {
  component: Timer,
  title: 'components/Timer',
  argTypes: {
    onTimerEnd: { action: 'onTimerEnd' },
  },
} as ComponentMeta<typeof Timer>;

const Template: ComponentStory<typeof Timer> = (args) => <Timer {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'timer',
  timestamp: getTimestamp(10),
};
