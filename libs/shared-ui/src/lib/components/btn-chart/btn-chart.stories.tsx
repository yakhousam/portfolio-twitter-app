import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useTheme } from '@yak-twitter-app/shared-lib';
import { BtnChart } from './btn-chart';

export default {
  component: BtnChart,
  title: 'components/BtnChart',
  argTypes: {
    handleClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof BtnChart>;

const Template: ComponentStory<typeof BtnChart> = (args) => (
  <BtnChart {...args} />
);

export const DefaultLight = Template.bind({});
DefaultLight.args = {
  caption: 'h1',
};
DefaultLight.decorators = [
  (Story) => {
    useTheme('light');
    return <Story />;
  },
];

export const ActiveLight = Template.bind({});
ActiveLight.args = {
  caption: 'h1',
  active: true,
};
ActiveLight.decorators = [
  (Story) => {
    useTheme('light');
    return <Story />;
  },
];

export const DefaultDark = Template.bind({});
DefaultDark.args = {
  caption: 'h1',
};
DefaultDark.decorators = [
  (Story) => {
    useTheme('dark');
    return <Story />;
  },
];

export const ActiveDark = Template.bind({});
ActiveDark.args = {
  caption: 'h1',
  active: true,
};
ActiveDark.decorators = [
  (Story) => {
    useTheme('dark');
    return <Story />;
  },
];
