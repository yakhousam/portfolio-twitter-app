import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputDate } from './input-date';

export default {
  component: InputDate,
  title: 'Components/InputDate',
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as ComponentMeta<typeof InputDate>;

const Template: ComponentStory<typeof InputDate> = (args) => (
  <InputDate {...args} />
);

export const Default = Template.bind({});

Default.args = {
  label: 'start date',
  value: '2022-07-31',
};
