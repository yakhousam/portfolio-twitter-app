import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import {
  formatDateYYYMMDD,
  getDefaultEndDate,
  getDefaultStartDate,
} from '@yak-twitter-app/utility/date';
import { SearchOptions } from './search-options';

export default {
  component: SearchOptions,
  title: 'screens/SearchOptions',
} as ComponentMeta<typeof SearchOptions>;

const Template: ComponentStory<typeof SearchOptions> = (args) => (
  <SearchOptions />
);

export const Default = Template.bind({});

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const defaultStartDate = getDefaultStartDate();
  const defaultEndDate = getDefaultEndDate();

  const startDateMax = new Date(defaultEndDate);
  startDateMax.setDate(startDateMax.getDate() - 1);
  const endDateMin = new Date(defaultStartDate);
  endDateMin.setDate(endDateMin.getDate() + 1);

  const startDateInput = canvas.getByLabelText(/start/i);

  expect(startDateInput).toHaveValue(defaultStartDate);
  expect(startDateInput).toHaveAttribute('min', defaultStartDate);
  expect(startDateInput).toHaveAttribute(
    'max',
    formatDateYYYMMDD(startDateMax)
  );

  const endDateInput = canvas.getByLabelText(/end/i);

  expect(endDateInput).toHaveValue(defaultEndDate);
  expect(endDateInput).toHaveAttribute('min', formatDateYYYMMDD(endDateMin));
  expect(endDateInput).toHaveAttribute('max', defaultEndDate);

  return;
  let date = new Date(defaultEndDate);
  date.setDate(date.getDate() + Math.floor(Math.random() * 100) + 1);
  await userEvent.clear(startDateInput);
  await userEvent.type(startDateInput, formatDateYYYMMDD(date));
  expect(startDateInput).toHaveAttribute(
    'value',
    formatDateYYYMMDD(startDateMax)
  );
  date = new Date(defaultStartDate);
  date.setDate(date.getDate() - Math.floor(Math.random() * 100) + 1);
  await userEvent.clear(startDateInput);
  await userEvent.type(startDateInput, formatDateYYYMMDD(date));
  expect(startDateInput).toHaveAttribute('value', defaultStartDate);

  date = new Date(defaultStartDate);
  date.setDate(date.getDate() - Math.floor(Math.random() * 100) + 1);
  await userEvent.clear(endDateInput);
  await userEvent.type(endDateInput, formatDateYYYMMDD(date));
  expect(endDateInput).toHaveAttribute('value', formatDateYYYMMDD(endDateMin));
  date = new Date(defaultEndDate);
  date.setDate(date.getDate() + Math.floor(Math.random() * 100) + 1);
  await userEvent.clear(endDateInput);
  await userEvent.type(endDateInput, formatDateYYYMMDD(date));
  expect(endDateInput).toHaveAttribute('value', defaultEndDate);
};
