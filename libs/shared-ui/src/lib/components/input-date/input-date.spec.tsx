import { render } from '@testing-library/react';

import InputDate from './input-date';

describe('InputDate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputDate />);
    expect(baseElement).toBeTruthy();
  });
});
