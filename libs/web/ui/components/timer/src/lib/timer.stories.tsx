import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Timer } from './timer';
import { sleep } from '@yak-twitter-app/utility/helpers';
import { secondsToMMSS } from '@yak-twitter-app/utility/date';

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
  label: 'timer',
  seconds: 3,
};

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/C8eVLaTuAtQvJjcHBNqY4D/twitter-hashtag-analytic?node-id=521%3A858',
  },
};

Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByLabelText(args.label)).toBeInTheDocument();
  // I need to use findByText because the timer start from "00:00:00"
  await expect(
    await canvas.findByText(secondsToMMSS(args.seconds))
  ).toBeInTheDocument();
  await sleep((args.seconds + 1) * 1000);
  await expect(args.onTimerEnd).toHaveBeenCalled();
};
