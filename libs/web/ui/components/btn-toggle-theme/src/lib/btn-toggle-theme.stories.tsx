import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Theme } from '@yak-twitter-app/types';
import { BtnToggleTheme } from './btn-toggle-theme';

export default {
  component: BtnToggleTheme,
  title: 'components/BtnToggleTheme',
  argTypes: {
    toggleTheme: { action: 'toggleTheme' },
  },
} as ComponentMeta<typeof BtnToggleTheme>;

const Template: ComponentStory<typeof BtnToggleTheme> = (args) => (
  <BtnToggleTheme />
);

export const Default = Template.bind({});

Default.play = async ({ canvasElement }) => {
  // Theme context stores the theme on localstorage. I can use it here
  // otherwise there is no way to check for the them here on play function using sotrybook flow
  // though I can set window global object on preview.js  and use it here ex: window.theme
  const currentTheme = localStorage.getItem('theme') as Theme;
  const canvas = within(canvasElement);
  expect(
    canvas.getByLabelText(`dark mode ${currentTheme === 'dark' ? 'on' : 'off'}`)
  ).toBeTruthy();
};
