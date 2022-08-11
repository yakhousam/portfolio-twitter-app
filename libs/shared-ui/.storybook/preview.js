import '../src/css-reset.css';
import '../src/global.css';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { ThemeProvider } from '../src/lib/context/use-theme/use-theme';

initialize();

export const parameters = {
  theme: {
    selector: 'body',
    dataAttr: 'data-theme',
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
  mswDecorator,
];
