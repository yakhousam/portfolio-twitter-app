import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  AppStateContext,
  initialState,
} from '@yak-twitter-app/context/use-app-data';
import { TwitterTweetEmbedList } from './twitter-tweet-embed-list';

export default {
  component: TwitterTweetEmbedList,
  title: 'screens/TwitterTweetEmbedList',
  decorators: [
    (Story) => (
      <AppStateContext.Provider
        value={{
          ...initialState,
          mostEngagedTweets: [
            { id: '1545260483980234753', text: '' },
            { id: '1545260274726453248', text: '' },
            { id: '1545260256636424194', text: '' },
            { id: '1545259630015774722', text: '' },
            { id: '1545258875993133056', text: '' },
            { id: '1545258356834721793', text: '' },
          ],
        }}
      >
        <Story />
      </AppStateContext.Provider>
    ),
  ],
} as ComponentMeta<typeof TwitterTweetEmbedList>;

const Template: ComponentStory<typeof TwitterTweetEmbedList> = (args) => (
  <TwitterTweetEmbedList />
);

export const Default = Template.bind({});
