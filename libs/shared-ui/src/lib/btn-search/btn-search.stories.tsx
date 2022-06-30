import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useTheme } from '@yak-twitter-app/shared-lib';
import { BtnSearch } from './btn-search';

export default {
  component: BtnSearch,
  title: 'BtnSearch',
  argTypes: {
    handleClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof BtnSearch>;

const Template: ComponentStory<typeof BtnSearch> = (args) => (
  <BtnSearch {...args} />
);

const Light = Template.bind({});

Light.decorators = [
  (Story) => {
    useTheme('light');
    return <Story />;
  },
];

export const LightSmall = Template.bind({});
LightSmall.decorators = [
  (Story) => {
    useTheme('light');
    return <Story />;
  },
];

export const LightLarge = Template.bind({});
LightLarge.decorators = [
  (Story) => {
    useTheme('light');
    return <Story />;
  },
];

LightLarge.args = {
  size: 'large',
};

export const DarkSmall = Template.bind({});
DarkSmall.args = {
  size: 'small',
};
DarkSmall.decorators = [
  (Story) => {
    useTheme('dark');
    return <Story />;
  },
];

export const DarkLarge = Template.bind({});
DarkLarge.args = {
  size: 'large',
};
DarkLarge.decorators = [
  (Story) => {
    useTheme('dark');
    return <Story />;
  },
];
