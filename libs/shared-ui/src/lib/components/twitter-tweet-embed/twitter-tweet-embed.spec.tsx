import { render } from '@testing-library/react';

import TwitterEmbed from './twitter-tweet-embed';

describe('TwitterEmbed', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TwitterEmbed tweetId="1545260483980234753" />
    );
    expect(baseElement).toBeTruthy();
  });
});
