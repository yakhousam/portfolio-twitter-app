import { ComponentStory, ComponentMeta } from '@storybook/react';
import { getTimestamp, getTwitterData } from '@yak-twitter-app/shared-lib';
import {
  AppContext,
  initialState,
} from '../../context/use-app-data/use-app-data';
import { RateLimit } from './rate-limit';

import { screen } from '@storybook/testing-library';
import { jest, expect } from '@storybook/jest';

export default {
  component: RateLimit,
  title: 'screens/RateLimit',
  argTypes: {
    dispatch: { action: 'onTimerEnd' },
  },
} as ComponentMeta<typeof RateLimit>;

const Template: ComponentStory<typeof RateLimit> = (args) => <RateLimit />;

export const Default = Template.bind({});

Default.decorators = [
  (Story) => {
    return (
      <AppContext.Provider
        value={{
          state: {
            ...initialState,
            rateLimit: getTwitterData({
              startDate: new Date().toISOString(),
              endDate: new Date().toISOString(),
              reset: getTimestamp(60 * 15),
              maxResult: 100,
              limit: 180,
            }).rateLimit,
          },
          dispatch: jest.fn(),
        }}
      >
        <Story />
      </AppContext.Provider>
    );
  },
];

Default.play = async () => {
  expect(
    screen.getByRole('heading', { level: 2, name: /rate/i })
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/limit/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/remaining/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/reset/i)).toBeInTheDocument();
};
