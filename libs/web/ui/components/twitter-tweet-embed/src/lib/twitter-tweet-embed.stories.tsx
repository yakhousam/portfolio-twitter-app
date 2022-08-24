import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TwitterTweetEmbed } from './twitter-tweet-embed';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { sleep } from '@yak-twitter-app/utility/helpers';

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
  tweetId: '1545260483980234753',
};
Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const container = await canvas.findByTestId(args.tweetId);
  expect(container).toBeTruthy();
  await sleep(1000 * 4);
  expect(args.onLoad).toHaveBeenCalledTimes(1);
};
