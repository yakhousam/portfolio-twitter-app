import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { InputSearch } from './input-search';

export default {
  component: InputSearch,
  title: 'Components/InputSearch',
  argTypes: {
    handleChange: { action: 'handleChange' },
    error: { control: { type: 'radio', options: [true, false] } },
  },
  args: {
    clearError: jest.fn(),
  },
} as ComponentMeta<typeof InputSearch>;

const Template: ComponentStory<typeof InputSearch> = (args) => (
  <InputSearch {...args} />
);

export const Default = Template.bind({});

Default.args = {
  error: false,
};

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/C8eVLaTuAtQvJjcHBNqY4D/twitter-hashtag-analytic?node-id=247%3A320',
  },
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByLabelText(/search/i);
  await userEvent.clear(input);
  await userEvent.type(input, 'javascript');
  await expect(input).toHaveAttribute('value', 'javascript');
  await userEvent.tab();
};

export const Error = Template.bind({});

Error.args = {
  error: true,
};

Error.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByLabelText(/search/i);
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await userEvent.clear(input);
  await userEvent.type(input, 'something');
  await userEvent.clear(input);
  await expect(args.clearError).toHaveBeenCalled();
  await userEvent.tab();
};
