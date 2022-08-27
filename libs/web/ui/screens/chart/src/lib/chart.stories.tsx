import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withReactContext } from 'storybook-react-context';

import { Chart } from './chart';
import {
  AppStateContext,
  AppStatusContext,
  initialState,
} from '@yak-twitter-app/context/use-app-data';
import { combineChartData } from '@yak-twitter-app/utility/app-data-reducer';
import { getTwitterData } from '@yak-twitter-app/mocks/tweets';

const end = new Date();
const start = new Date();
start.setDate(start.getDate() - 7);

export default {
  component: Chart,
  title: 'screens/Chart',
  decorators: [
    withReactContext({
      Context: AppStateContext,
      initialState: {
        chart: combineChartData(
          initialState.chart,
          getTwitterData({
            startDate: start.toISOString(),
            endDate: end.toISOString(),
            maxResult: 2000,
          }).tweets.map((tweet) => tweet.created_at)
        ),
      },
    }),
    withReactContext({
      Context: AppStatusContext,
      initialState: 'resolved',
    }),
  ],
} as ComponentMeta<typeof Chart>;

const Template: ComponentStory<typeof Chart> = (args) => <Chart />;

export const Default = Template.bind({});
