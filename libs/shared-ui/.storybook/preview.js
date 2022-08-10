import '../src/css-reset.css';
import '../src/global.css';
import { initialize, mswDecorator } from 'msw-storybook-addon';

initialize();

export const parameters = {
  theme: {
    selector: 'body',
    dataAttr: 'data-theme',
  },
};

export const decorators = [mswDecorator];
