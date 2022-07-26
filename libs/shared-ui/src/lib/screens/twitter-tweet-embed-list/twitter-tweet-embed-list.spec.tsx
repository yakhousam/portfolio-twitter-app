import { render } from '@testing-library/react';

import TweetsList from './twitter-tweet-embed-list';

describe('TweetsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TweetsList />);
    expect(baseElement).toBeTruthy();
  });
});
