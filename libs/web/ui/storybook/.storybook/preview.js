import '../../css-reset.css';
import '../../global.css';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { ThemeProvider } from '@yak-twitter-app/context/use-theme';

initialize();

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
  mswDecorator,
];
