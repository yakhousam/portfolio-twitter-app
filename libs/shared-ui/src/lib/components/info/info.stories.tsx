import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Info } from './info';

export default {
  component: Info,
  title: 'Components/Info',
} as ComponentMeta<typeof Info>;

const Template: ComponentStory<typeof Info> = (args) => <Info {...args} />;

export const Static = Template.bind({});
Static.args = {
  title: 'limit',
  highValue: 1000,
  lowValue: 0,
  animate: false,
};

export const AnimateCountDown = Template.bind({});
AnimateCountDown.args = {
  title: 'limit',
  highValue: 100,
  lowValue: 0,
  animate: true,
  countDownDirection: 'down',
  spead: 1,
};

export const AnimateCountUp = Template.bind({});
AnimateCountUp.args = {
  title: 'limit',
  highValue: 100,
  lowValue: 0,
  animate: true,
  countDownDirection: 'up',
  spead: 1,
};
