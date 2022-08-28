import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TweetsStatistics } from './tweets-statistics';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import {
  AppDataProvider,
  AppStateContext,
  initialState,
} from '@yak-twitter-app/context/use-app-data';

const mockData = {
  original: 210,
  replay: 120,
  retweet: 250,
};

export default {
  component: TweetsStatistics,
  title: 'screens/TweetsStatistics',
  decorators: [
    (Story) => (
      <AppStateContext.Provider value={{ ...initialState, ...mockData }}>
        <Story />
      </AppStateContext.Provider>
    ),
  ],

  argTypes: {
    original: { control: { type: 'number', min: 210, max: 210 } },
    replay: { control: { type: 'number', min: 120, max: 120 } },
    retweet: { control: { type: 'number', min: 250, max: 250 } },
  },
} as ComponentMeta<typeof TweetsStatistics>;

const Template: ComponentStory<typeof TweetsStatistics> = (args) => (
  <TweetsStatistics />
);

export const Default = Template.bind({});

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByRole('heading', { level: 2 })).toHaveTextContent(
    /[a-zA-Z]/
  );
  await expect(canvas.getByLabelText(/original/i)).toBeInTheDocument();
  await expect(canvas.getByTestId('original-value')).toHaveTextContent(/\d/);
  await expect(canvas.getByTestId('original-aria-value')).toHaveTextContent(
    mockData.original.toString()
  );

  await expect(canvas.getByLabelText(/replay/i)).toBeInTheDocument();
  await expect(canvas.getByTestId('replay-value')).toHaveTextContent(/\d/);
  await expect(canvas.getByTestId('replay-aria-value')).toHaveTextContent(
    mockData.replay.toString()
  );

  await expect(canvas.getByLabelText(/retweet/i)).toBeInTheDocument();
  await expect(canvas.getByTestId('retweet-value')).toHaveTextContent(/\d/);
  await expect(canvas.getByTestId('retweet-aria-value')).toHaveTextContent(
    mockData.retweet.toString()
  );

  await expect(canvas.getByLabelText(/total/i)).toBeInTheDocument();
  await expect(canvas.getByTestId('total-value')).toHaveTextContent(/\d/);
  await expect(canvas.getByTestId('total-aria-value')).toHaveTextContent(
    (mockData.original + mockData.replay + mockData.retweet).toString()
  );
};
