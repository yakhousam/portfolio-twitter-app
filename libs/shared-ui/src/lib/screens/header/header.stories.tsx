import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Header } from './header';

import { screen, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  component: Header,
  title: 'screens/Header',
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});

Default.play = async () => {
  const button = screen.getByLabelText('toggle theme', { selector: 'button' });
  const theme = document.body.dataset['theme'];

  await userEvent.click(button);
  expect(document.body.dataset['theme']).not.toBe(theme);

  await userEvent.click(button);
  expect(document.body.dataset['theme']).toBe(theme);
};
