import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  AppContext,
  initialState,
} from '../../context/use-app-data/use-app-data';
import { ThemeProvider } from '../../context/use-theme/use-theme';
import { TwitterTimelineEmbedList } from './twitter-timeline-embed-list';
import { jest } from '@storybook/jest';

export default {
  component: TwitterTimelineEmbedList,
  title: 'screens/TwitterTimelineEmbedList',
} as ComponentMeta<typeof TwitterTimelineEmbedList>;

const Template: ComponentStory<typeof TwitterTimelineEmbedList> = (args) => (
  <TwitterTimelineEmbedList />
);

export const Default = Template.bind({});
Default.decorators = [
  (Story) => {
    return (
      <ThemeProvider>
        <AppContext.Provider
          value={{
            state: {
              ...initialState,
              mostFollowedAccountIds: [
                '1000814755664150528',
                '710123736175783938',
                '1098126456276828160',
                '2704581690',
                '1354693765940846594',
                '1142424032794406912',
              ],
            },
            dispatch: jest.fn(),
          }}
        >
          <Story />
        </AppContext.Provider>
      </ThemeProvider>
    );
  },
];
