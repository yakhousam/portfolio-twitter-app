import { render } from '@testing-library/react';

import RankedAccounts from './ranked-accounts';

describe('RankedAccounts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RankedAccounts />);
    expect(baseElement).toBeTruthy();
  });
});
