import { render } from '@testing-library/react';

import ContextUseTheme from './context-use-theme';

describe('ContextUseTheme', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContextUseTheme />);
    expect(baseElement).toBeTruthy();
  });
});
