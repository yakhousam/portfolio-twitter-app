import { render } from '@testing-library/react';

import BtnDirection from './btn-direction';

describe('BtnDirection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BtnDirection />);
    expect(baseElement).toBeTruthy();
  });
});
