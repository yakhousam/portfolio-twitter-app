import { render } from '@testing-library/react';

import TwitterEmbed from './twitter-tweet-embed';

describe('TwitterEmbed', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TwitterEmbed />);
    expect(baseElement).toBeTruthy();
  });
});
