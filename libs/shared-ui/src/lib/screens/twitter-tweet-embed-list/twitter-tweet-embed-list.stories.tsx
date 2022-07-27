import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TwitterTweetEmbedList } from './twitter-tweet-embed-list';

const tweetsIds = [
  '1545260483980234753',
  '1545260274726453248',
  '1545260256636424194',
  '1545259630015774722',
  '1545258875993133056',
  '1545258356834721793',
];

export default {
  component: TwitterTweetEmbedList,
  title: 'screens/TwitterTweetEmbedList',
} as ComponentMeta<typeof TwitterTweetEmbedList>;

const Template: ComponentStory<typeof TwitterTweetEmbedList> = (args) => (
  <TwitterTweetEmbedList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tweetsIds,
  title: 'random tweets',
};
