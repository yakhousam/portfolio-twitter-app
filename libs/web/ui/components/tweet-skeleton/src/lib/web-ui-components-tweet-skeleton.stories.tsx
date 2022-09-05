import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WebUiComponentsTweetSkeleton as TweetSkeleton } from './web-ui-components-tweet-skeleton';

export default {
  component: TweetSkeleton,
  title: 'components/TweetSkeleton',
} as ComponentMeta<typeof TweetSkeleton>;

const Template: ComponentStory<typeof TweetSkeleton> = (args) => (
  <TweetSkeleton {...args} />
);

export const Default = Template.bind({});
Default.decorators = [
  (Story) => (
    <div style={{ width: '400px', marginInline: 'auto' }}>
      <Story />
    </div>
  ),
];
