import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withReactContext } from 'storybook-react-context';

import { analyzeTweets } from '@yak-twitter-app/utility/tweets';

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
          analyzeTweets(
            getTwitterData({
              startDate: start.toISOString(),
              endDate: end.toISOString(),
              maxResult: 2000,
            }).tweets
          ).chartData
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
