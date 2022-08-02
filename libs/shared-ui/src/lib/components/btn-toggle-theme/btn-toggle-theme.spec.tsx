import { render } from '@testing-library/react';

import BtnToggleTheme from './btn-toggle-theme';

describe('BtnToggleTheme', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BtnToggleTheme />);
    expect(baseElement).toBeTruthy();
  });
});
