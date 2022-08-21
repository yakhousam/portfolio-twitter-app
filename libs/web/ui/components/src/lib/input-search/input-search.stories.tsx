import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputSearch } from './input-search';

export default {
  component: InputSearch,
  title: 'Components/InputSearch',
  argTypes: {
    handleChange: { action: 'handleChange' },
  },
} as ComponentMeta<typeof InputSearch>;

const Template: ComponentStory<typeof InputSearch> = (args) => (
  <InputSearch {...args} />
);

export const Default = Template.bind({});

export const Error = Template.bind({});

Error.args = {
  error: true,
};