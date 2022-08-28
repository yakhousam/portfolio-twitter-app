import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import {
  ActionType,
  AppDataProvider,
  AppDispatchContext,
  AppStatusContext,
} from '@yak-twitter-app/context/use-app-data';
import { SearchBar } from './search-bar';
import { sleep } from '@yak-twitter-app/utility/helpers';

export default {
  component: SearchBar,
  title: 'screens/SearchBar',
  decorators: [
    (Story) => (
      <AppDataProvider>
        <Story />
      </AppDataProvider>
    ),
  ],
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar />;

const dispatch = jest.fn();

export const Default = Template.bind({});

Default.decorators = [
  (Story) => (
    <AppDispatchContext.Provider value={dispatch}>
      <Story />
    </AppDispatchContext.Provider>
  ),
];
Default.play = async ({ canvasElement }) => {
  const canvas = await within(canvasElement);
  await userEvent.type(canvas.getByLabelText(/search hashtag/i), 'JavaScript');
  await userEvent.click(canvas.getByRole('button', { name: /search/i }));
  const action: ActionType = { type: 'search_start' };
  await expect(dispatch).toHaveBeenCalledWith(action);
};

export const IsSearching = Template.bind({});

IsSearching.decorators = [
  (Story) => (
    <AppStatusContext.Provider value="receiving">
      <AppDispatchContext.Provider value={dispatch}>
        <Story />
      </AppDispatchContext.Provider>
    </AppStatusContext.Provider>
  ),
];

IsSearching.play = async ({ canvasElement }) => {
  const canvas = await within(canvasElement);
  await userEvent.click(canvas.getByRole('button', { name: /cancel/i }));
  const action: ActionType = { type: 'search_is_cancelling' };
  await expect(dispatch).toHaveBeenCalledWith(action);
};

export const ErrorSubmittingEmptyHashtag = Template.bind({});

ErrorSubmittingEmptyHashtag.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole('button', { name: /search/i }));
  await expect(await canvas.findByText(/error/i)).toBeInTheDocument();
};

export const RecoverFromError = Template.bind({});

RecoverFromError.play = async (context) => {
  await ErrorSubmittingEmptyHashtag.play?.(context);

  const { canvasElement } = context;
  const canvas = within(canvasElement);
  userEvent.type(canvas.getByLabelText(/search hashtag/i), 'JavaScript');
  expect(canvas.queryByText(/error/i)).not.toBeInTheDocument();
};
