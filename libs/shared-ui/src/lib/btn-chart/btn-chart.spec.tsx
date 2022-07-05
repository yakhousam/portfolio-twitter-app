import { render } from '@testing-library/react';

import BtnChart from './btn-chart';

describe('BtnChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BtnChart />);
    expect(baseElement).toBeTruthy();
  });
});
