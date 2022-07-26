import { render } from '@testing-library/react';

import TwitterTimelineEmbed from './twitter-timeline-embed';

describe('TwitterTimelineEmbed', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TwitterTimelineEmbed />);
    expect(baseElement).toBeTruthy();
  });
});
