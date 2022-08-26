import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Output } from './output';

export default {
  component: Output,
  title: 'Components/Output',
  argTypes: {
    value: { control: 'number' },
    ariaValue: { control: 'number' },
  },
} as ComponentMeta<typeof Output>;

const Template: ComponentStory<typeof Output> = (args) => <Output {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: 'total',
  value: 1000,
};

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/C8eVLaTuAtQvJjcHBNqY4D/twitter-hashtag-analytic?node-id=513%3A1024',
  },
};

Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const output = canvas.getByLabelText(args.label);
  expect(output).toHaveTextContent(String(args.value));
};

export const WithAriaValue = Template.bind({});
WithAriaValue.args = {
  ...Default.args,
  ariaValue: 1200,
};

WithAriaValue.parameters = {
  ...Default.parameters,
};

WithAriaValue.play = async (context) => {
  const { args, canvasElement } = context;
  const canvas = within(canvasElement);
  await Default.play?.(context);
  expect(canvas.getByLabelText(args.label)).toHaveTextContent(
    String(args.ariaValue)
  );
};
