import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TwitterTimelineEmbedList } from './twitter-timeline-embed-list';

import {
  AppStateContext,
  initialState,
} from '@yak-twitter-app/context/use-app-data';

export default {
  component: TwitterTimelineEmbedList,
  title: 'screens/TwitterTimelineEmbedList',
  decorators: [
    (Story) => (
      <AppStateContext.Provider
        value={{
          ...initialState,
          rankedAccounts: [
            { id: '1', name: '', username: 'javascript' },
            { id: '2', name: '', username: 'yksamir' },
            { id: '3', name: '', username: 'reactjs' },
            { id: '4', name: '', username: 'nodejs' },
            { id: '5', name: '', username: 'fbjest' },
            { id: '6', name: '', username: 'typescript' },
          ],
        }}
      >
        <Story />
      </AppStateContext.Provider>
    ),
  ],
} as ComponentMeta<typeof TwitterTimelineEmbedList>;

const Template: ComponentStory<typeof TwitterTimelineEmbedList> = (args) => (
  <TwitterTimelineEmbedList />
);

export const Default = Template.bind({});
