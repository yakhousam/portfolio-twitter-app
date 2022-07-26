import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TwitterTweetEmbed } from './twitter-tweet-embed';

export default {
  component: TwitterTweetEmbed,
  title: 'components/TwitterTweetEmbed',
} as ComponentMeta<typeof TwitterTweetEmbed>;

const Template: ComponentStory<typeof TwitterTweetEmbed> = (args) => (
  <TwitterTweetEmbed {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tweetId: '1527401326325338118',
};
