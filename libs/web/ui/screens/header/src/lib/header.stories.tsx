import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Header } from './header';

import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  component: Header,
  title: 'screens/Header',
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header />;

export const Default = Template.bind({});

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const theme = window.localStorage.getItem('theme');

  await userEvent.click(
    canvas.getByLabelText(/dark mode/i, { selector: 'button' })
  );
  await expect(window.localStorage.getItem('theme')).not.toBe(theme);

  await userEvent.click(
    canvas.getByLabelText(/dark mode/i, { selector: 'button' })
  );
  await expect(window.localStorage.getItem('theme')).toBe(theme);
};
