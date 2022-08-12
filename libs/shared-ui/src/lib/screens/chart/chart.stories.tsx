import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  analyzeTweets,
  combineChartData,
  getTwitterData,
} from '@yak-twitter-app/shared-lib';
import {
  AppContext,
  initialState,
} from '../../context/use-app-data/use-app-data';
import { Chart } from './chart';
import { jest } from '@storybook/jest';

export default {
  component: Chart,
  title: 'screens/Chart',
} as ComponentMeta<typeof Chart>;

const Template: ComponentStory<typeof Chart> = (args) => <Chart />;

export const Default = Template.bind({});
Default.decorators = [
  (Story) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    return (
      <AppContext.Provider
        value={{
          state: {
            ...initialState,
            chart: combineChartData(
              initialState.chart,
              analyzeTweets(
                getTwitterData({
                  startDate: start.toISOString(),
                  endDate: end.toISOString(),
                }).tweets
              ).chartData
            ),
          },
          dispatch: jest.fn(),
        }}
      >
        <Story />
      </AppContext.Provider>
    );
  },
];
