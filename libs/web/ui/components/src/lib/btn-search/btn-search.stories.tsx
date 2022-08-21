import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withReactContext } from 'storybook-react-context';
import { BtnSearch } from './btn-search';
import { AppStatusContext } from '@yak-twitter-app/context/use-app-data';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  component: BtnSearch,
  title: 'Components/BtnSearch',
  decorators: [
    withReactContext({
      Context: AppStatusContext,
    }),
  ],
  argTypes: {
    handleCancelSearch: {
      action: 'handleCancelSearch',
      control: { type: '' },
    },
    handleSubmit: { action: 'handleSubmit', control: { type: '' } },
  },
} as ComponentMeta<typeof BtnSearch>;

const Template: ComponentStory<typeof BtnSearch> = (args) => (
  <BtnSearch {...args} />
);

export const Default = Template.bind({});
Default.parameters = {
  reactContext: {
    initialState: 'idle',
  },
};
Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByLabelText(/search/i);
  expect(button).toBeInTheDocument();
  await userEvent.click(button);
  expect(args.handleSubmit).toHaveBeenCalledTimes(1);
  expect(args.handleCancelSearch).not.toHaveBeenCalled();
};

export const isSearching = Template.bind({});
isSearching.parameters = {
  reactContext: {
    initialState: 'pending',
  },
};

isSearching.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button', { name: /cancel/i });
  expect(button).toBeInTheDocument();
  await userEvent.click(button);
  expect(args.handleCancelSearch).toHaveBeenCalledTimes(1);
  expect(args.handleSubmit).not.toHaveBeenCalled();
};
