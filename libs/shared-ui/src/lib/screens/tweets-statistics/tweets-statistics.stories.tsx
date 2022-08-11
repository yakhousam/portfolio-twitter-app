import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  AppContext,
  initialState,
} from '../../context/use-app-data/use-app-data';
import { TweetsStatistics } from './tweets-statistics';

import { jest } from '@storybook/jest';

export default {
  component: TweetsStatistics,
  title: 'screens/TweetsStatistics',
} as ComponentMeta<typeof TweetsStatistics>;

const Template: ComponentStory<typeof TweetsStatistics> = (args) => (
  <TweetsStatistics />
);

export const Default = Template.bind({});
Default.decorators = [
  (Story) => {
    return (
      <AppContext.Provider
        value={{
          state: {
            ...initialState,
            original: 1024,
            replay: 521,
            retweet: 2545,
          },
          dispatch: jest.fn(),
        }}
      >
        <Story />
      </AppContext.Provider>
    );
  },
];
