import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import { useSearchHashtag } from './use-search-hashtag';

describe('useSearch', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useSearchHashtag());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
