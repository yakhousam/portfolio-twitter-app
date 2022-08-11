import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import { useSearchHashtag } from './use-search-hashtag';

describe('useSearch', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useSearchHashtag());
  });
});
