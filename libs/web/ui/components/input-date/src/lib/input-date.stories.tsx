import { ComponentStory, ComponentMeta } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { formatDateYYYMMDD } from '@yak-twitter-app/utility/date';
import React, { useEffect, useState } from 'react';
import { InputDate } from './input-date';
import { expect } from '@storybook/jest';

export default {
  component: InputDate,
  title: 'Components/InputDate',
  argTypes: {
    onChange: { action: 'onChange' },
    value: { control: 'date' },
  },
} as ComponentMeta<typeof InputDate>;

const Template: ComponentStory<typeof InputDate> = (args) => {
  const value = Number.isNaN(Number(args.value))
    ? args.value
    : parseInt(args.value);
  const [cvalue, setValue] = useState(formatDateYYYMMDD(new Date(value)));
  useEffect(() => {
    setValue(formatDateYYYMMDD(new Date(value)));
  }, [value]);
  return (
    <InputDate
      label={args.label}
      value={cvalue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(formatDateYYYMMDD(new Date(e.currentTarget.value)));
      }}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  label: 'start date',
  value: '2022-07-31',
};
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/C8eVLaTuAtQvJjcHBNqY4D/twitter-hashtag-analytic?node-id=513%3A1029',
  },
};

Default.play = async ({ args, canvasElement }) => {
  const value = Number.isNaN(Number(args.value))
    ? args.value
    : parseInt(args.value);

  const canvas = within(canvasElement);

  const input = canvas.getByLabelText(args.label);
  await expect(input).toHaveProperty(
    'value',
    formatDateYYYMMDD(new Date(value))
  );
  await userEvent.clear(input);
  const newDate = '2022-08-20';
  await userEvent.type(input, newDate);
  await expect(input).toHaveProperty('value', newDate);
};
