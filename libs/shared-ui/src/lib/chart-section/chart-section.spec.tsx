import { render } from '@testing-library/react';

import ChartSection from './chart-section';

describe('ChartSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChartSection />);
    expect(baseElement).toBeTruthy();
  });
});
