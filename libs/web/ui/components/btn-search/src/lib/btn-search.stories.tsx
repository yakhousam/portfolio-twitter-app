import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BtnSearch } from './btn-search';
import { AppStatusContext } from '@yak-twitter-app/context/use-app-data';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  component: BtnSearch,
  title: 'Components/BtnSearch',
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
Default.decorators = [
  (Stroy) => (
    <AppStatusContext.Provider value={{ status: 'idle', error: undefined }}>
      <Stroy />
    </AppStatusContext.Provider>
  ),
];
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/C8eVLaTuAtQvJjcHBNqY4D/twitter-hashtag-analytic?node-id=509%3A774',
  },
};
Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole('button', { name: /search/i }));
  await expect(args.handleSubmit).toHaveBeenCalledTimes(1);
  await expect(args.handleCancelSearch).not.toHaveBeenCalled();
};

export const isSearching = Template.bind({});
isSearching.parameters = {
  design: Default.parameters['design'],
};

isSearching.decorators = [
  (Stroy) => (
    <AppStatusContext.Provider
      value={{ status: 'receiving', error: undefined }}
    >
      <Stroy />
    </AppStatusContext.Provider>
  ),
];

isSearching.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole('button', { name: /cancel/i }));
  await expect(args.handleCancelSearch).toHaveBeenCalledTimes(1);
  await expect(args.handleSubmit).not.toHaveBeenCalled();
};
