import { ComponentStory, ComponentMeta } from '@storybook/react';
import { screen, userEvent } from '@storybook/testing-library';
import { jest, expect } from '@storybook/jest';

import { BtnChart } from './btn-chart';
import { TypeOrArrayOf } from 'twitter-api-v2/dist/types/shared.types';

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
  handleClick: jest.fn(),
};

export const Active = Template.bind({});
Active.args = {
  ...Default.args,
  active: true,
};

Default.play = async () => {
  const button = screen.getByRole('button');
  await userEvent.click(button);
  expect(Default.args?.handleClick).toHaveBeenCalled();
};
