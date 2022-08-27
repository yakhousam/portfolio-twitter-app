import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Output } from './output';

export default {
  component: Output,
  title: 'Components/Output',
  argTypes: {
    value: { control: 'number' },
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
  expect(canvas.getByLabelText(args.label)).toHaveTextContent(
    String(args.value)
  );
};
