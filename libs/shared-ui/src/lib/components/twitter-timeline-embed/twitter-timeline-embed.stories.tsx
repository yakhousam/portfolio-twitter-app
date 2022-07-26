import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TwitterTimelineEmbed } from './twitter-timeline-embed';

export default {
  component: TwitterTimelineEmbed,
  title: 'TwitterTimelineEmbed',
} as ComponentMeta<typeof TwitterTimelineEmbed>;

const Template: ComponentStory<typeof TwitterTimelineEmbed> = (args) => (
  <TwitterTimelineEmbed {...args} />
);

export const Default = Template.bind({});
Default.args = {
  userId: '1098126456276828160',
};
