import { ComponentStory, ComponentMeta } from '@storybook/react';
import { getTimestamp, useTheme } from '@yak-twitter-app/shared-lib';
import { Timer } from './timer';

export default {
  component: Timer,
  title: 'components/Timer',
} as ComponentMeta<typeof Timer>;

const Template: ComponentStory<typeof Timer> = (args) => <Timer {...args} />;

export const Light = Template.bind({});
Light.args = {
  timestamp: getTimestamp(1),
  onTimerEnd: () => console.log('timer end'),
};
Light.decorators = [
  (Story) => {
    useTheme('light');
    return <Story />;
  },
];

export const Dark = Template.bind({});
Dark.args = {
  timestamp: getTimestamp(1),
  onTimerEnd: () => console.log('timer end'),
};
Dark.decorators = [
  (Story) => {
    useTheme('dark');
    return <Story />;
  },
];
