import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BtnChart } from './btn-chart';

export default {
  component: BtnChart,
  title: 'components/BtnChart',
  argTypes: {
    handleClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof BtnChart>;

const Template: ComponentStory<typeof BtnChart> = (args) => (
  <BtnChart {...args} />
);

export const Default = Template.bind({});

Default.args = {
  caption: 'h1',
  active: false,
};

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/C8eVLaTuAtQvJjcHBNqY4D/twitter-hashtag-analytic?node-id=203%3A396',
  },
};
Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(
    canvas.getByRole('button', { name: args.caption, pressed: undefined })
  ).toBeTruthy();
};

export const Active = Template.bind({});
Active.args = {
  ...Default.args,
  active: true,
};

Active.parameters = {
  ...Default.parameters,
};

Active.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(
    canvas.getByRole('button', { name: args.caption, pressed: true })
  ).toBeTruthy();
};
