import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputSearch } from './input-search';

export default {
  component: InputSearch,
  title: 'Components/InputSearch',
} as ComponentMeta<typeof InputSearch>;

const Template: ComponentStory<typeof InputSearch> = (args) => (
  <InputSearch {...args} />
);

export const Default = Template.bind({});
