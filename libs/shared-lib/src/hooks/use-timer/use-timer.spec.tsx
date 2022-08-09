import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useTimer from './use-timer';

describe('useTimer', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useTimer());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
