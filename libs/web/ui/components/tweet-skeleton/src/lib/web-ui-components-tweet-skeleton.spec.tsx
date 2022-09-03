import { render } from '@testing-library/react';

import WebUiComponentsTweetSkeleton from './web-ui-components-tweet-skeleton';

describe('WebUiComponentsTweetSkeleton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebUiComponentsTweetSkeleton />);
    expect(baseElement).toBeTruthy();
  });
});
