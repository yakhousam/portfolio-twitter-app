import { ComponentStory, ComponentMeta } from '@storybook/react';
import { getTimestamp } from '@yak-twitter-app/shared-lib';
import { Timer } from './timer';

export default {
  component: Timer,
  title: 'Timer',
} as ComponentMeta<typeof Timer>;

const Template: ComponentStory<typeof Timer> = (args) => <Timer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  timestamp: getTimestamp(1),
  onTimerEnd: () => console.log('timer end'),
};
