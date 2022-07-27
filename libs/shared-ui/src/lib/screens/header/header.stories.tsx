import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Header } from './header';
import { useTheme } from '@yak-twitter-app/shared-lib';

export default {
  component: Header,
  title: 'screens/Header',
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
