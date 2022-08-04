import { act, render, screen } from '@testing-library/react';
import { getTimestamp } from '@yak-twitter-app/shared-lib';

import Timer from './timer';

jest.useFakeTimers();

describe('Timer', () => {
  it('should render successfully', () => {
    const title = 'timer';
    const seconds = 10;
    const timer = `00 : ${seconds}`;
    render(
      <Timer
        title={title}
        timestamp={getTimestamp(seconds)}
        onTimerEnd={jest.fn()}
      />
    );
    const match = new RegExp(title, 'i');
    expect(screen.getByText(match)).toBeInTheDocument();
    expect(screen.getByText(timer)).toBeInTheDocument();
  });

  it('should call the passed callback when timer ends', async () => {
    const handleOnTimerEnd = jest.fn();
    const seconds = 10;
    render(
      <Timer
        title="timer"
        timestamp={getTimestamp(seconds)}
        onTimerEnd={handleOnTimerEnd}
      />
    );
    for (let i = seconds; i > 0; i--) {
      act(() => {
        jest.advanceTimersToNextTimer();
      });
    }

    expect(handleOnTimerEnd).toBeCalledTimes(1);
  });
});
