import { render } from '@testing-library/react';

import ContextUseAppData from './context-use-app-data';

describe('ContextUseAppData', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContextUseAppData />);
    expect(baseElement).toBeTruthy();
  });
});
