import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BtnDirection } from './btn-direction';

export default {
  component: BtnDirection,
  title: 'components/BtnDirection',
  argTypes: {
    handleClick: { action: 'handleClick' },
  },
} as ComponentMeta<typeof BtnDirection>;

const Template: ComponentStory<typeof BtnDirection> = (args) => (
  <BtnDirection {...args} />
);

export const Left = Template.bind({});
Left.args = {
  direction: 'left',
};

Left.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/C8eVLaTuAtQvJjcHBNqY4D/twitter-hashtag-analytic?node-id=407%3A934',
  },
};

Left.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(
    canvas.getByRole('button', {
      name: args.direction === 'left' ? /backward/i : /forward/i,
    })
  );
  await expect(args.handleClick).toHaveBeenCalled();
};

export const Right = Template.bind({});

Right.args = {
  direction: 'right',
};

Right.parameters = {
  ...Left.parameters,
};

Right.play = async (context) => {
  await Left.play?.(context);
};
