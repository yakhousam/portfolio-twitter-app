import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  AppContext,
  initialState,
} from '../../context/use-app-data/use-app-data';
import { ThemeProvider } from '../../context/use-theme/use-theme';
import { TwitterTweetEmbedList } from './twitter-tweet-embed-list';
import { jest } from '@storybook/jest';

export default {
  component: TwitterTweetEmbedList,
  title: 'screens/TwitterTweetEmbedList',
} as ComponentMeta<typeof TwitterTweetEmbedList>;

const Template: ComponentStory<typeof TwitterTweetEmbedList> = (args) => (
  <TwitterTweetEmbedList />
);

export const Default = Template.bind({});

Default.decorators = [
  (Story) => {
    return (
      <ThemeProvider>
        <AppContext.Provider
          value={{
            state: {
              ...initialState,
              mostEngagedTweetsIds: [
                '1545260483980234753',
                '1545260274726453248',
                '1545260256636424194',
                '1545259630015774722',
                '1545258875993133056',
                '1545258356834721793',
              ],
            },
            dispatch: jest.fn(),
          }}
        >
          <Story />
        </AppContext.Provider>
      </ThemeProvider>
    );
  },
];
