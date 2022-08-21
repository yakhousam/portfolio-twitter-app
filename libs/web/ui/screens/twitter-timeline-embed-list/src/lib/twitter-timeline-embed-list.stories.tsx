import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TwitterTimelineEmbedList } from './twitter-timeline-embed-list';
import { withReactContext } from 'storybook-react-context';
import { AppStateContext } from '@yak-twitter-app/context/use-app-data';

export default {
  component: TwitterTimelineEmbedList,
  title: 'screens/TwitterTimelineEmbedList',
  decorators: [
    withReactContext({
      Context: AppStateContext,
      initialState: {
        mostFollowedAccountIds: [
          '1000814755664150528',
          '710123736175783938',
          '1098126456276828160',
          '2704581690',
          '1354693765940846594',
          '1142424032794406912',
        ],
      },
    }),
  ],
} as ComponentMeta<typeof TwitterTimelineEmbedList>;

const Template: ComponentStory<typeof TwitterTimelineEmbedList> = (args) => (
  <TwitterTimelineEmbedList />
);

export const Default = Template.bind({});
