import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TwitterTimelineEmbed } from './twitter-timeline-embed';

export default {
  component: TwitterTimelineEmbed,
  title: 'TwitterTimelineEmbed',
} as ComponentMeta<typeof TwitterTimelineEmbed>;

const Template: ComponentStory<typeof TwitterTimelineEmbed> = (args) => (
  <TwitterTimelineEmbed {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  username: 'yksamir',
};
