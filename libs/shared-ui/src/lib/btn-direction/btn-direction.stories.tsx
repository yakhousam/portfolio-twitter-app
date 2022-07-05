import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useTheme } from '@yak-twitter-app/shared-lib';
import { BtnDirection } from './btn-direction';

export default {
  component: BtnDirection,
  title: 'components/BtnDirection',
} as ComponentMeta<typeof BtnDirection>;

const Template: ComponentStory<typeof BtnDirection> = (args) => (
  <BtnDirection {...args} />
);

export const LightLeft = Template.bind({});
LightLeft.args = {
  direction: 'left',
};
LightLeft.decorators = [
  (Story) => {
    useTheme('light');
    return <Story />;
  },
];

export const LightRight = Template.bind({});
LightRight.args = {
  direction: 'right',
};
LightRight.decorators = [
  (Story) => {
    useTheme('light');
    return <Story />;
  },
];

export const DarkLeft = Template.bind({});
DarkLeft.args = {
  direction: 'left',
};
DarkLeft.decorators = [
  (Story) => {
    useTheme('dark');
    return <Story />;
  },
];

export const DarkRight = Template.bind({});
DarkRight.args = {
  direction: 'right',
};
DarkRight.decorators = [
  (Story) => {
    useTheme('dark');
    return <Story />;
  },
];
