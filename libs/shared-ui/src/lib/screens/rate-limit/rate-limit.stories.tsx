import { ComponentStory, ComponentMeta } from '@storybook/react';
import { getTimestamp, getTwitterData } from '@yak-twitter-app/shared-lib';
import {
  AppContext,
  initialState,
} from '../../context/use-app-data/use-app-data';
import { RateLimit } from './rate-limit';

import { jest } from '@storybook/jest';

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
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 15);
    return (
      <AppContext.Provider
        value={{
          state: {
            ...initialState,
            rateLimit: getTwitterData({
              startDate: start.toISOString(),
              endDate: end.toISOString(),
              reset: getTimestamp(60),
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
