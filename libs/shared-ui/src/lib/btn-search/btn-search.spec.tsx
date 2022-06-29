import { render } from '@testing-library/react';

import BtnSearch from './btn-search';

describe('BtnSearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BtnSearch />);
    expect(baseElement).toBeTruthy();
  });
});
