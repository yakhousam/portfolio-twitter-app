import { render } from '@testing-library/react';

import TwitterEmbed from './twitter-embed';

describe('TwitterEmbed', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TwitterEmbed />);
    expect(baseElement).toBeTruthy();
  });
});
