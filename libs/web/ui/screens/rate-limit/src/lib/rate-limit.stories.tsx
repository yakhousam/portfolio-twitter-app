import { ComponentStory, ComponentMeta } from '@storybook/react';
import { jest, expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import {
  ActionType,
  AppDispatchContext,
  AppStateContext,
  initialState,
} from '@yak-twitter-app/context/use-app-data';
import { getTimestamp, secondsToMMSS } from '@yak-twitter-app/utility/date';

import { RateLimit } from './rate-limit';
import { sleep } from '@yak-twitter-app/utility/helpers';

export default {
  component: RateLimit,
  title: 'screens/RateLimit',
  argTypes: {
    dispatch: { action: 'onTimerEnd' },
  },
} as ComponentMeta<typeof RateLimit>;

const Template: ComponentStory<typeof RateLimit> = (args) => <RateLimit />;

export const Default = Template.bind({});

const mockData = {
  rateLimit: {
    limit: 450,
    remaining: 420,
    reset: getTimestamp(4),
  },
  dispatch: jest.fn(),
};

Default.decorators = [
  (Story) => {
    return (
      <AppStateContext.Provider
        value={{
          ...initialState,
          rateLimit: { ...mockData.rateLimit, reset: getTimestamp(4) },
        }}
      >
        <AppDispatchContext.Provider value={mockData.dispatch}>
          <Story />
        </AppDispatchContext.Provider>
      </AppStateContext.Provider>
    );
  },
];

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(canvas.getByRole('heading', { level: 2 })).toHaveTextContent(
    /[a-zA-Z]/
  );

  await expect(canvas.getByLabelText(/limit/i)).toHaveValue(
    mockData.rateLimit.limit.toString()
  );

  await expect(canvas.getByLabelText(/remaining/i)).toHaveValue(
    mockData.rateLimit.remaining.toString()
  );

  await expect(canvas.getByLabelText(/reset/i)).toBeInTheDocument();

  await sleep(4 * 1000);
  const action: ActionType = { type: 'reset_limit' };
  await expect(mockData.dispatch).toHaveBeenCalledWith(action);
};
