import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InfoMessage } from './info-message';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  component: InfoMessage,
  title: 'components/InfoMessage',
} as ComponentMeta<typeof InfoMessage>;

const Template: ComponentStory<typeof InfoMessage> = (args) => (
  <InfoMessage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'not found',
  message: 'cannot find hashtag',
};

Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(
    canvas.getByRole('heading', { level: 2, name: args.title })
  ).toBeInTheDocument();
  await expect(canvas.getByText(args.message)).toBeInTheDocument();
};
