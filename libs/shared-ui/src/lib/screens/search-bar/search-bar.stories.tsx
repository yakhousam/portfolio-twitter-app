import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchBar } from './search-bar';
import { userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import {
  formatDateYYYMMDD,
  getDefaultEndDate,
  getDefaultStartDate,
} from '@yak-twitter-app/shared-lib';
import {
  AppDataProvider,
  AppContext,
  initialState,
} from '@yak-twitter-app/shared-ui';

export default {
  component: SearchBar,
  title: 'screens/SearchBar',
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar />;

export const Default = Template.bind({});

Default.decorators = [
  (Story) => (
    <AppDataProvider>
      <Story />
    </AppDataProvider>
  ),
];

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const user = userEvent;

  const startDateInput = canvas.getByLabelText(/start/i);
  const endDateInput = canvas.getByLabelText(/end/i);

  const startDateMax = new Date(getDefaultEndDate());
  startDateMax.setDate(startDateMax.getDate() - 1);
  const endDateMin = new Date(getDefaultStartDate());
  endDateMin.setDate(endDateMin.getDate() + 1);

  expect(startDateInput).toHaveAttribute('value', getDefaultStartDate());
  expect(startDateInput).toHaveAttribute('min', getDefaultStartDate());
  expect(startDateInput).toHaveAttribute(
    'max',
    formatDateYYYMMDD(startDateMax)
  );

  expect(endDateInput).toHaveAttribute('value', getDefaultEndDate());
  expect(endDateInput).toHaveAttribute('min', formatDateYYYMMDD(endDateMin));
  expect(endDateInput).toHaveAttribute('max', getDefaultEndDate());

  let date = new Date(getDefaultEndDate());
  date.setDate(date.getDate() + Math.floor(Math.random() * 100) + 1);
  await user.clear(startDateInput);
  await user.type(startDateInput, formatDateYYYMMDD(date));
  expect(startDateInput).toHaveAttribute(
    'value',
    formatDateYYYMMDD(startDateMax)
  );
  date = new Date(getDefaultStartDate());
  date.setDate(date.getDate() - Math.floor(Math.random() * 100) + 1);
  await user.clear(startDateInput);
  await user.type(startDateInput, formatDateYYYMMDD(date));
  expect(startDateInput).toHaveAttribute('value', getDefaultStartDate());

  date = new Date(getDefaultStartDate());
  date.setDate(date.getDate() - Math.floor(Math.random() * 100) + 1);
  await user.clear(endDateInput);
  await user.type(endDateInput, formatDateYYYMMDD(date));
  expect(endDateInput).toHaveAttribute('value', formatDateYYYMMDD(endDateMin));
  date = new Date(getDefaultEndDate());
  date.setDate(date.getDate() + Math.floor(Math.random() * 100) + 1);
  await user.clear(endDateInput);
  await user.type(endDateInput, formatDateYYYMMDD(date));
  expect(endDateInput).toHaveAttribute('value', getDefaultEndDate());
};

export const Searching = Template.bind({});
Searching.decorators = [
  (Story) => (
    <AppContext.Provider
      value={{
        state: { ...initialState, status: 'pending' },
        dispatch: jest.fn(),
      }}
    >
      <Story />
    </AppContext.Provider>
  ),
];

export const ErrorSubmittingEmptyHashtag = Template.bind({});

ErrorSubmittingEmptyHashtag.decorators = [...Default.decorators];

ErrorSubmittingEmptyHashtag.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const user = userEvent;

  const searchInput = canvas.getByRole('searchbox');
  const searchButton = canvas.getByLabelText('search');

  await user.clear(searchInput);
  await user.click(searchButton);
  expect(canvas.getByText(/error/i)).toBeInTheDocument();
};
