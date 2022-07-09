import { render } from '@testing-library/react';

import InputSearch from './input-search';

describe('InputSearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputSearch />);
    expect(baseElement).toBeTruthy();
  });
});
