import '../../css-reset.css';
import '../../global.css';
import { themes } from '@storybook/theming';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { ThemeProvider, useTheme } from '@yak-twitter-app/context/use-theme';
import { useDarkMode } from 'storybook-dark-mode';
import { useEffect } from 'react';

initialize();

console.log('preview theme =');

export const parameters = {
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appBg: 'black' },
    // Override the default light theme
    light: { ...themes.normal, appBg: 'white' },
  },
};

export const decorators = [
  (Stroy) => {
    const { theme, toggleTheme } = useTheme();
    const storyTheme = useDarkMode() ? 'dark' : 'light';
    useEffect(() => {
      if (theme !== storyTheme) {
        toggleTheme();
      }
    }, [storyTheme, theme, toggleTheme]);
    return <Stroy />;
  },
  (Stroy) => (
    <ThemeProvider>
      <Stroy />
    </ThemeProvider>
  ),
  mswDecorator,
];
