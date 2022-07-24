import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputDate } from './input-date';

export default {
  component: InputDate,
  title: 'Components/InputDate',
} as ComponentMeta<typeof InputDate>;

const Template: ComponentStory<typeof InputDate> = (args) => (
  <InputDate {...args} />
);

export const Default = Template.bind({});

Default.args = {
  label: 'start date',
};
