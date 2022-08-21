import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withReactContext } from 'storybook-react-context';
import { BtnToggleTheme } from './btn-toggle-theme';
import { ThemeContext } from '@yak-twitter-app/context/use-theme';
import { userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

export default {
  component: BtnToggleTheme,
  title: 'components/BtnToggleTheme',
  decorators: [
    withReactContext({
      Context: ThemeContext,
    }),
  ],
  argTypes: {
    toggleTheme: { action: 'toggleTheme' },
    theme: { control: 'radio', options: ['dark', 'light'] },
  },
} as ComponentMeta<typeof BtnToggleTheme>;

const Template: ComponentStory<typeof BtnToggleTheme> = (args) => (
  <BtnToggleTheme />
);

export const DarkThemeOn = Template.bind({});
DarkThemeOn.args = {
  theme: 'dark',
};
DarkThemeOn.parameters = {
  reactContext: {
    initialState: {
      theme: 'dark',
      toggleTheme: jest.fn(),
    },
    useProviderValue: (_state: unknown, args: unknown) => args,
  },
};

DarkThemeOn.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByLabelText(/dark mode on/i));
  const toggleTheme = (args as { toggleTheme: typeof jest.fn }).toggleTheme;
  expect(toggleTheme).toHaveBeenCalledTimes(1);
};

export const DarkThemeOff = Template.bind({});
DarkThemeOff.args = {
  theme: 'light',
};
DarkThemeOff.parameters = {
  reactContext: {
    initialState: {
      theme: 'light',
    },
    useProviderValue: (_state: unknown, args: unknown) => args,
  },
};
DarkThemeOff.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByLabelText(/dark mode off/i));
  const toggleTheme = (args as { toggleTheme: typeof jest.fn }).toggleTheme;
  expect(toggleTheme).toHaveBeenCalledTimes(1);
};
