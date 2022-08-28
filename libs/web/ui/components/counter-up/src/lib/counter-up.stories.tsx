import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { CounterUp } from './counter-up';
import { expect } from '@storybook/jest';
import { sleep } from '@yak-twitter-app/utility/helpers';

export default {
  component: CounterUp,
  title: 'Components/CounterUp',
} as ComponentMeta<typeof CounterUp>;

const Template: ComponentStory<typeof CounterUp> = (args) => (
  <CounterUp {...args} />
);

export const Default = Template.bind({});

Default.args = {
  label: 'counter up',
  from: 0,
  to: 50,
  spead: 3,
};

Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByLabelText(args.label)).toBeInTheDocument();

  await expect(
    canvas.getByTestId(`${args.label}-aria-value`)
  ).toHaveTextContent(args.to.toString());

  await expect(canvas.getByTestId(`${args.label}-value`)).toHaveTextContent(
    args.from.toString()
  );
  await sleep((20 * args.to) / (args.spead || 1));
  await expect(canvas.getByTestId(`${args.label}-value`)).toHaveTextContent(
    args.to.toString()
  );
};
