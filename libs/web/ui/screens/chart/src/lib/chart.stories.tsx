import { ComponentStory, ComponentMeta } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Chart } from './chart';
import {
  AppStateContext,
  AppStatusContext,
  initialState,
} from '@yak-twitter-app/context/use-app-data';
import { combineChartData } from '@yak-twitter-app/utility/app-data-reducer';
import { TimeFrame } from '@yak-twitter-app/types';
import { sleep } from '@yak-twitter-app/utility/helpers';
import { dumyData } from '@yak-twitter-app/mocks/msw-data';

const tweets = Object.values(dumyData)
  .map((v) => v.data.data)
  .flat();

export default {
  component: Chart,
  title: 'screens/Chart',
  decorators: [
    (Story) => (
      <AppStateContext.Provider
        value={{
          ...initialState,
          chart: combineChartData(
            initialState.chart,
            tweets.map((tweet) => tweet.created_at)
          ),
        }}
      >
        <AppStatusContext.Provider
          value={{ status: 'resolved', error: undefined, isData: true }}
        >
          <Story />
        </AppStatusContext.Provider>
      </AppStateContext.Provider>
    ),
  ],
} as ComponentMeta<typeof Chart>;

const Template: ComponentStory<typeof Chart> = (args) => <Chart />;

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/C8eVLaTuAtQvJjcHBNqY4D/twitter-hashtag-analytic?node-id=249%3A345',
  },
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const timeFrameArray: Array<TimeFrame> = [
    'm5',
    'm15',
    'm30',
    'h1',
    'h4',
    'd1',
    'm5',
  ];

  await sleep(1000 * 2);

  for (const timeFrame of timeFrameArray) {
    await userEvent.click(
      canvas.getByRole('button', {
        name: timeFrame,
        pressed: undefined,
      })
    );
    await sleep(1000 * 1);
    await expect(
      canvas.getByRole('button', { name: timeFrame, pressed: true })
    ).toBeInTheDocument();
  }

  await expect(canvas.getByLabelText(/forward/i)).toBeDisabled();
  await userEvent.click(canvas.getByLabelText(/backward/i));
  await sleep(1000 * 0.5);
  await userEvent.click(canvas.getByLabelText(/forward/i));
};
