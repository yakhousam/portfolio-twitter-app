import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WebUiComponentsTweetSkeleton } from './web-ui-components-tweet-skeleton';

export default {
  component: WebUiComponentsTweetSkeleton,
  title: 'WebUiComponentsTweetSkeleton',
} as ComponentMeta<typeof WebUiComponentsTweetSkeleton>;

const Template: ComponentStory<typeof WebUiComponentsTweetSkeleton> = (
  args
) => <WebUiComponentsTweetSkeleton {...args} />;

export const Default = Template.bind({});
Default.decorators = [
  (Story) => (
    <div style={{ width: '400px', marginInline: 'auto' }}>
      <Story />
    </div>
  ),
];
