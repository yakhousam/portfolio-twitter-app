import { render } from '@testing-library/react';

import TweetsList from './tweets-list';

describe('TweetsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TweetsList />);
    expect(baseElement).toBeTruthy();
  });
});
