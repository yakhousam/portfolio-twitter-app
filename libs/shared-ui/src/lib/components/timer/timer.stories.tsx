import { ComponentStory, ComponentMeta } from '@storybook/react';
import { getTimestamp } from '@yak-twitter-app/shared-lib';
import { useState } from 'react';
import { Timer } from './timer';

export default {
  component: Timer,
  title: 'components/Timer',
} as ComponentMeta<typeof Timer>;

const Template: ComponentStory<typeof Timer> = (args) => <Timer {...args} />;

export const Default = Template.bind({});

Default.decorators = [
  (Story) => {
    const [timestamp, setTimestamp] = useState(getTimestamp(10));
    const onTimerEnd = () => setTimestamp(getTimestamp(12));

    return <Story args={{ title: 'timer', timestamp, onTimerEnd }} />;
  },
];
