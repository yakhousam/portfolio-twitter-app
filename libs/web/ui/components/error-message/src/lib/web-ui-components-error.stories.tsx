import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WebUiComponentsError as ErrorMessage } from './web-ui-components-error';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  component: ErrorMessage,
  title: 'ErrorMessage',
} as ComponentMeta<typeof ErrorMessage>;

const Template: ComponentStory<typeof ErrorMessage> = (args) => (
  <ErrorMessage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  error: {
    status: 429,
    message: 'too many requests',
  },
};

Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(
    canvas.getByRole('heading', {
      level: 2,
      name: /error/i,
    })
  ).toBeInTheDocument();
};
