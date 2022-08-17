import { ComponentStory, ComponentMeta } from '@storybook/react';
import { waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Timer } from './timer';
import { sleep } from '@yak-twitter-app/shared-lib';

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

Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByLabelText(args.label)).toBeInTheDocument();
  const regexp = new RegExp(String(args.seconds), 'i');
  expect(await canvas.findByText(regexp)).toBeInTheDocument();
  await sleep((args.seconds + 1) * 1000);
  await expect(args.onTimerEnd).toHaveBeenCalled();
};
