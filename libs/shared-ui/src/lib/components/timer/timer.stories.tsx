import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Timer } from './timer';

function getTimestamp() {
  const d = new Date();
  d.setMinutes(d.getMinutes() + 1);
  return d.getTime();
}

export default {
  component: Timer,
  title: 'Timer',
} as ComponentMeta<typeof Timer>;

const Template: ComponentStory<typeof Timer> = (args) => <Timer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  timestamp: getTimestamp(),
  onTimerEnd: () => console.log('timer end'),
};
