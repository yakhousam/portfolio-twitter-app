import { render } from '@testing-library/react';

import TwitterTimelineEmbedList from './twitter-timeline-embed-list';

describe('TwitterTimelineEmbedList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TwitterTimelineEmbedList />);
    expect(baseElement).toBeTruthy();
  });
});
