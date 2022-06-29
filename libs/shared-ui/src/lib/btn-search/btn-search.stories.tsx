import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BtnSearch } from './btn-search';

export default {
  component: BtnSearch,
  title: 'BtnSearch',
} as ComponentMeta<typeof BtnSearch>;

const Template: ComponentStory<typeof BtnSearch> = (args) => (
  <BtnSearch {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
