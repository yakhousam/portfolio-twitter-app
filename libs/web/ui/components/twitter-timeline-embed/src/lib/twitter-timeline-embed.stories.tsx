import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TwitterTimelineEmbed } from './twitter-timeline-embed';

export default {
  component: TwitterTimelineEmbed,
  title: 'components/TwitterTimelineEmbed',
} as ComponentMeta<typeof TwitterTimelineEmbed>;

const Template: ComponentStory<typeof TwitterTimelineEmbed> = (args) => (
  <TwitterTimelineEmbed {...args} />
);

export const Default = Template.bind({});
Default.args = {
  username: 'yksamir',
};
Default.decorators = [
  (Story) => (
    <div style={{ width: 400, margin: 'auto' }}>
      <Story />
    </div>
  ),
];
