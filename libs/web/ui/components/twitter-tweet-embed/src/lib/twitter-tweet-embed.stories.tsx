import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TwitterTweetEmbed } from './twitter-tweet-embed';

export default {
  component: TwitterTweetEmbed,
  title: 'components/TwitterTweetEmbed',
  argTypes: {
    onLoad: { action: 'onLoad' },
  },
} as ComponentMeta<typeof TwitterTweetEmbed>;

const Template: ComponentStory<typeof TwitterTweetEmbed> = (args) => (
  <TwitterTweetEmbed {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tweetId: '1549798435011715072',
};
Default.decorators = [
  (Story) => (
    <div style={{ width: 400, margin: 'auto' }}>
      <Story />
    </div>
  ),
];
