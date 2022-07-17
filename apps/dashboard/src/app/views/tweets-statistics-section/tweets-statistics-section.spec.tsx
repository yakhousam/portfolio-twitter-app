import { render } from '@testing-library/react';

import TweetsSection from './tweets-statistics-section';

describe('TweetsSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TweetsSection />);
    expect(baseElement).toBeTruthy();
  });
});
