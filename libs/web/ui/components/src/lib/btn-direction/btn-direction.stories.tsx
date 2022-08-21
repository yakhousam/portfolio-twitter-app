import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BtnDirection } from './btn-direction';

export default {
  component: BtnDirection,
  title: 'components/BtnDirection',
} as ComponentMeta<typeof BtnDirection>;

const Template: ComponentStory<typeof BtnDirection> = (args) => (
  <BtnDirection {...args} />
);

export const Left = Template.bind({});
Left.args = {
  direction: 'left',
};

export const Right = Template.bind({});
Right.args = {
  direction: 'right',
};
