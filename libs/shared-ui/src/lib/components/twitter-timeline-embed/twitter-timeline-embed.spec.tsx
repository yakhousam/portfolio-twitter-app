import { render } from '@testing-library/react';

import TwitterTimelineEmbed from './twitter-timeline-embed';

describe('TwitterTimelineEmbed', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TwitterTimelineEmbed userId="1000814755664150528" />
    );
    expect(baseElement).toBeTruthy();
  });
});
