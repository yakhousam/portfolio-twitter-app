import { act, renderHook } from '@testing-library/react';

import useTimer from './use-timer';

jest.useFakeTimers();

describe('useTimer', () => {
  it('should render successfully', () => {
    const seconds = 15;
    const { result } = renderHook(() => useTimer(seconds));
    expect(result.current.timer).toBe(seconds);
  });
  it('should decrease the timer by one every seconds', () => {
    const seconds = 3;
    const { result } = renderHook(() => useTimer(seconds));
    for (let i = 1; i <= seconds; i++) {
      act(() => {
        jest.advanceTimersToNextTimer();
      });
      expect(result.current.timer).toBe(seconds - i);
    }
  });
  it('should start a timer when we call startTimer', () => {
    const { result } = renderHook(() => useTimer());
    expect(result.current.timer).toBe(undefined);
    act(() => {
      result.current.startTimer(15);
    });
    expect(result.current.timer).toBe(15);
    act(() => {
      jest.advanceTimersToNextTimer();
    });
    expect(result.current.timer).toBe(14);
  });

  it('should be able to start a new timer when timer reach 0', () => {
    const { result } = renderHook(() => useTimer(5));
    expect(result.current.timer).toBe(5);
    for (let i = 1; i <= 5; i++) {
      act(() => {
        jest.advanceTimersToNextTimer();
      });
    }
    expect(result.current.timer).toBe(0);
    act(() => {
      result.current.startTimer(30);
    });
    expect(result.current.timer).toBe(30);
    act(() => {
      jest.advanceTimersToNextTimer();
    });
    expect(result.current.timer).toBe(29);
  });
});
