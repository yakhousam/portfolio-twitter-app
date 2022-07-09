import { render } from '@testing-library/react';

import InputMaxResult from './input-max-result';

describe('InputMaxResult', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputMaxResult />);
    expect(baseElement).toBeTruthy();
  });
});
