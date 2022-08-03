import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BtnSearch } from './btn-search';
import { MdSearch } from 'react-icons/md';

export default {
  component: BtnSearch,
  title: 'Components/BtnSearch',
  argTypes: {
    handleClick: { action: 'handleClick' },
  },
} as ComponentMeta<typeof BtnSearch>;

const Template: ComponentStory<typeof BtnSearch> = (args) => (
  <BtnSearch {...args} />
);

export const DefaultWithIcon = Template.bind({});
DefaultWithIcon.args = {
  children: <MdSearch />,
};

export const DefaultWithText = Template.bind({});
DefaultWithText.args = {
  ...DefaultWithText.args,
  children: 'cancle',
};
