import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TwitterTimelineEmbedList } from './twitter-timeline-embed-list';

export default {
  component: TwitterTimelineEmbedList,
  title: 'TwitterTimelineEmbedList',
} as ComponentMeta<typeof TwitterTimelineEmbedList>;

const Template: ComponentStory<typeof TwitterTimelineEmbedList> = (args) => (
  <TwitterTimelineEmbedList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'most followed accounts timeline',
  usersIds: [
    '1000814755664150528',
    '710123736175783938',
    '1098126456276828160',
    '2704581690',
    '1354693765940846594',
    '1142424032794406912',
  ],
};
