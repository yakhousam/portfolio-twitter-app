import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Header } from './header';
import { useTheme } from '@yak-twitter-app/shared-lib';

export default {
  component: Header,
  title: 'Composite components/Header',
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Light = Template.bind({});
Light.decorators = [
  (Story) => {
    useTheme('light');
    return <Story />;
  },
];

export const Dark = Template.bind({});
Dark.decorators = [
  (Story) => {
    useTheme('dark');
    return <Story />;
  },
];
