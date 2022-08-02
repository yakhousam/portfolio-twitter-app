import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BtnToggleTheme } from './btn-toggle-theme';

export default {
  component: BtnToggleTheme,
  title: 'BtnToggleTheme',
  argTypes: {
    handleClick: { action: 'handleClick' },
  },
} as ComponentMeta<typeof BtnToggleTheme>;

const Template: ComponentStory<typeof BtnToggleTheme> = (args) => (
  <BtnToggleTheme {...args} />
);

export const Default = Template.bind({});
