import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useTheme } from '@yak-twitter-app/shared-lib';
import { TwitterEmbed } from './twitter-embed';

export default {
  component: TwitterEmbed,
  title: 'TwitterEmbed',
} as ComponentMeta<typeof TwitterEmbed>;

const Template: ComponentStory<typeof TwitterEmbed> = (args) => (
  <TwitterEmbed {...args} />
);

export const Light = Template.bind({});
Light.args = {
  tweetId: '933354946111705097',
};
Light.decorators = [
  (Story) => {
    useTheme('light');
    return <Story />;
  },
];

export const Dark = Template.bind({});
Dark.args = {
  tweetId: '933354946111705097',
};
Dark.decorators = [
  (Story) => {
    useTheme('dark');
    return <Story />;
  },
];
