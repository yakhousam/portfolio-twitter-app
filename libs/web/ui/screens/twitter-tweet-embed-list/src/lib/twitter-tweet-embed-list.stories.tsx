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
        mostEngagedTweetsIds: [
          '1545260483980234753',
          '1545260274726453248',
          '1545260256636424194',
          '1545259630015774722',
          '1545258875993133056',
          '1545258356834721793',
        ],
      },
    }),
  ],
} as ComponentMeta<typeof TwitterTweetEmbedList>;

const Template: ComponentStory<typeof TwitterTweetEmbedList> = (args) => (
  <TwitterTweetEmbedList />
);

export const Default = Template.bind({});
