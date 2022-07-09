import { render } from '@testing-library/react';

import Timer from './timer';

describe('Timer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Timer />);
    expect(baseElement).toBeTruthy();
  });
});
