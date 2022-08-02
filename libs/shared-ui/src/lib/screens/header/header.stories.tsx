import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Header } from './header';

export default {
  component: Header,
  title: 'screens/Header',
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
