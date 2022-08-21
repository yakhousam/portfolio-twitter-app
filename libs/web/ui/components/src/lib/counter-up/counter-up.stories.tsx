import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { CounterUp } from './counter-up';
import { expect } from '@storybook/jest';
import { sleep } from '@yak-twitter-app/shared-lib';

export default {
  component: CounterUp,
  title: 'Components/CounterUp',
} as ComponentMeta<typeof CounterUp>;

const Template: ComponentStory<typeof CounterUp> = (args) => (
  <CounterUp {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'counter up',
  from: 0,
  to: 50,
  spead: 3,
};

Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const counter = canvas.getByLabelText(args.title);
  expect(counter).toHaveTextContent(String(args.from));
  await sleep((20 * args.to) / (args.spead || 1));
  expect(counter).toHaveTextContent(String(args.to));
};
