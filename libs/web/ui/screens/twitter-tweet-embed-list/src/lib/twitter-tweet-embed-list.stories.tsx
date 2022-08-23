import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AppStateContext } from '@yak-twitter-app/context/use-app-data';
import { withReactContext } from 'storybook-react-context';
import { TwitterTweetEmbedList } from './twitter-tweet-embed-list';

export default {
  component: TwitterTweetEmbedList,
  title: 'screens/TwitterTweetEmbedList',
  decorators: [
    withReactContext({
      Context: AppStateContext,
      initialState: {
        mostEngagedTweets: [
          { id: '1545260483980234753' },
          { id: '1545260274726453248' },
          { id: '1545260256636424194' },
          { id: '1545259630015774722' },
          { id: '1545258875993133056' },
          { id: '1545258356834721793' },
        ],
      },
    }),
  ],
} as ComponentMeta<typeof TwitterTweetEmbedList>;

const Template: ComponentStory<typeof TwitterTweetEmbedList> = (args) => (
  <TwitterTweetEmbedList />
);

export const Default = Template.bind({});
