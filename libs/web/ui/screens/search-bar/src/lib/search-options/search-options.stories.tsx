import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { formatDateYYYMMDD } from '@yak-twitter-app/utility/date';
import { SearchOptions } from './search-options';

export default {
  component: SearchOptions,
  title: 'screens/SearchOptions',
  decorators: [
    (Story) => (
      <div style={{ width: 'max-content', marginInline: 'auto' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof SearchOptions>;

const Template: ComponentStory<typeof SearchOptions> = (args) => (
  <SearchOptions />
);

export const StartDateHandleOnchange = Template.bind({});
StartDateHandleOnchange.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const date = new Date();
  date.setDate(date.getDate() - 1);
  await userEvent.type(
    canvas.getByLabelText(/start/i),
    formatDateYYYMMDD(date)
  );
  await expect(canvas.getByLabelText(/start/i)).toHaveValue(
    formatDateYYYMMDD(date)
  );
};

export const EndDateHandleOnChange = Template.bind({});
EndDateHandleOnChange.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const date = new Date();
  date.setDate(date.getDate() - 1);
  await userEvent.type(canvas.getByLabelText(/end/i), formatDateYYYMMDD(date));
  await expect(canvas.getByLabelText(/end/i)).toHaveValue(
    formatDateYYYMMDD(date)
  );
};

export const StartDayAtLeastOneDayLessThanEndDate = Template.bind({});
StartDayAtLeastOneDayLessThanEndDate.play = async (context) => {
  const { canvasElement } = context;
  const canvas = within(canvasElement);
  const startDate = canvas.getByLabelText<HTMLInputElement>(/start/i);
  const endDate = canvas.getByLabelText<HTMLInputElement>(/end/i);

  const date = new Date(startDate.value);
  date.setDate(date.getDate() + 10);
  await userEvent.type(startDate, formatDateYYYMMDD(date));
  await expect(
    new Date(endDate.value).getTime() - new Date(startDate.value).getTime()
  ).toBeGreaterThanOrEqual(1000 * 60 * 60 * 24 * 1); // one day

  const date2 = new Date(endDate.value);
  date2.setDate(date2.getDate() - 10);
  await userEvent.type(endDate, formatDateYYYMMDD(date2));
  await expect(
    new Date(endDate.value).getTime() - new Date(startDate.value).getTime()
  ).toBeGreaterThanOrEqual(1000 * 60 * 60 * 24 * 1); // one day
};

export const EndDateAtLeastOneDayGreaterThanStartDate = Template.bind({});
EndDateAtLeastOneDayGreaterThanStartDate.play = async (context) => {
  const { canvasElement } = context;
  const canvas = within(canvasElement);
  const startDate = canvas.getByLabelText<HTMLInputElement>(/start/i);
  const endDate = canvas.getByLabelText<HTMLInputElement>(/end/i);

  const date = new Date(endDate.value);
  date.setDate(date.getDate() - 10);
  await userEvent.type(endDate, formatDateYYYMMDD(date));
  await expect(
    new Date(endDate.value).getTime() - new Date(startDate.value).getTime()
  ).toBeGreaterThanOrEqual(1000 * 60 * 60 * 24 * 1); // one day

  const date2 = new Date(startDate.value);
  date2.setDate(date2.getDate() + 10);
  await userEvent.type(startDate, formatDateYYYMMDD(date2));
  await expect(
    new Date(endDate.value).getTime() - new Date(startDate.value).getTime()
  ).toBeGreaterThanOrEqual(1000 * 60 * 60 * 24 * 1); // one day
};

export const StartDateCannotBeLessThanCurrentDateMinusSix = Template.bind({});
StartDateCannotBeLessThanCurrentDateMinusSix.play = async ({
  canvasElement,
}) => {
  const canvas = within(canvasElement);
  const date = new Date();
  date.setDate(date.getDate() - 7);
  await userEvent.type(
    canvas.getByLabelText(/start/i),
    formatDateYYYMMDD(date)
  );
  const expectedDate = new Date();
  expectedDate.setDate(expectedDate.getDate() - 6);
  expect(
    new Date(
      (canvas.getByLabelText(/start/i) as HTMLInputElement).value
    ).getTime()
  ).toBeGreaterThanOrEqual(new Date(formatDateYYYMMDD(expectedDate)).getTime());
};

export const EndDateCannotBeGreaterThanCurrentDate = Template.bind({});
EndDateCannotBeGreaterThanCurrentDate.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const date = new Date();
  date.setDate(date.getDate() + 1);
  await userEvent.type(canvas.getByLabelText(/end/i), formatDateYYYMMDD(date));
  await expect(
    new Date(
      (canvas.getByLabelText(/end/i) as HTMLInputElement).value
    ).getTime()
  ).toBeLessThanOrEqual(new Date().getTime());
};
