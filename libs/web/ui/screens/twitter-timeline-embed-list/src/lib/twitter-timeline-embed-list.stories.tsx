import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TwitterTimelineEmbedList } from './twitter-timeline-embed-list';
import { withReactContext } from 'storybook-react-context';
import { AppStateContext } from '@yak-twitter-app/context/use-app-data';
import { SearchHashtagReturnData } from '@yak-twitter-app/types';

type InitialState = Partial<SearchHashtagReturnData>;

const initialState: InitialState = {
  rankedAccounts: [
    { id: '1', name: '', username: 'javascript' },
    { id: '2', name: '', username: 'yksamir' },
    { id: '3', name: '', username: 'reactjs' },
    { id: '4', name: '', username: 'nodejs' },
    { id: '5', name: '', username: 'fbjest' },
    { id: '6', name: '', username: 'typescript' },
  ],
};

export default {
  component: TwitterTimelineEmbedList,
  title: 'screens/TwitterTimelineEmbedList',
  decorators: [
    withReactContext({
      Context: AppStateContext,
      initialState,
    }),
  ],
} as ComponentMeta<typeof TwitterTimelineEmbedList>;

const Template: ComponentStory<typeof TwitterTimelineEmbedList> = (args) => (
  <TwitterTimelineEmbedList />
);

export const Default = Template.bind({});
