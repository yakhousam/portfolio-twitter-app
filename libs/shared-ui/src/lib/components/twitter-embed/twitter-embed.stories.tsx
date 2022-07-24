import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TwitterEmbed } from './twitter-embed';

export default {
  component: TwitterEmbed,
  title: 'components/TwitterEmbed',
} as ComponentMeta<typeof TwitterEmbed>;

const Template: ComponentStory<typeof TwitterEmbed> = (args) => (
  <TwitterEmbed {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tweetId: '1545095899294097409',
};
