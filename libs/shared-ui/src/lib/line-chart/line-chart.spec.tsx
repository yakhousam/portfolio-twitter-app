import { render } from '@testing-library/react';

import LineChart from './line-chart';

describe('LineChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LineChart />);
    expect(baseElement).toBeTruthy();
  });
});
