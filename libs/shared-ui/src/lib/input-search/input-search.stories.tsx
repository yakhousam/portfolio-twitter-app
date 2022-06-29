import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputSearch } from './input-search';

export default {
  component: InputSearch,
  title: 'InputSearch',
} as ComponentMeta<typeof InputSearch>;

const Template: ComponentStory<typeof InputSearch> = (args) => (
  <InputSearch {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
