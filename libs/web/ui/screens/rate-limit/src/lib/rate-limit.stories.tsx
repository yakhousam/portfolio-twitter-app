import { ComponentStory, ComponentMeta } from '@storybook/react';
import { jest, expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import {
  AppDispatchContext,
  AppStateContext,
  initialState,
} from '@yak-twitter-app/context/use-app-data';
import { getTimestamp, secondsToMMSS } from '@yak-twitter-app/utility/date';

import { RateLimit } from './rate-limit';

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
    reset: getTimestamp(15),
  },
  dispatch: jest.fn(),
};

Default.decorators = [
  (Story) => {
    return (
      <AppStateContext.Provider
        value={{
          ...initialState,
          rateLimit: mockData.rateLimit,
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

  const timer = Math.floor((mockData.rateLimit.reset - Date.now()) / 1000);
  await expect(canvas.getByLabelText(/reset/i)).toBeInTheDocument();
  await expect(
    await canvas.findByText(secondsToMMSS(timer))
  ).toBeInTheDocument();
};
