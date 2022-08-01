import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputDateWrapper } from './input-date-wrapper';

export default {
  component: InputDateWrapper,
  title: 'Components/InputDateWrapper',
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as ComponentMeta<typeof InputDateWrapper>;

const Template: ComponentStory<typeof InputDateWrapper> = (args) => (
  <InputDateWrapper {...args} />
);

export const Default = Template.bind({});

// Default.args = {
//   label: 'start date',
//   value: '2022-07-31',
// };
