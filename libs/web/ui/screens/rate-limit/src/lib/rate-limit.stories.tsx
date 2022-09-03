import { ComponentStory, ComponentMeta } from '@storybook/react';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import {
  AppDispatchContext,
  AppStateContext,
  initialState,
  reducer,
} from '@yak-twitter-app/context/use-app-data';
import { getTimestamp } from '@yak-twitter-app/utility/date';

import { RateLimit } from './rate-limit';
import { sleep } from '@yak-twitter-app/utility/helpers';
import { useReducer } from 'react';

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
};

Default.decorators = [
  (Story) => {
    const [state, dispatch] = useReducer(reducer, {
      ...initialState,
      rateLimit: { ...mockData.rateLimit, reset: getTimestamp(4) },
    });
    const { status, error, ...data } = state;
    return (
      <AppStateContext.Provider value={data}>
        <AppDispatchContext.Provider value={dispatch}>
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
  await expect(canvas.getByLabelText(/remaining/i)).toHaveValue(
    mockData.rateLimit.limit.toString()
  );
};
