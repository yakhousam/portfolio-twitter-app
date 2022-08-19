import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Header } from './header';

import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  component: Header,
  title: 'screens/Header',
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});

Default.play = async ({ canvasElement, viewMode }) => {
  const canvas = within(canvasElement);
  const theme = window.localStorage.getItem('theme');
  const button = canvas.getByLabelText('toggle theme', { selector: 'button' });

  await userEvent.click(button);
  await expect(window.localStorage.getItem('theme')).not.toBe(theme);

  await userEvent.click(button);
  await expect(window.localStorage.getItem('theme')).toBe(theme);
};
