import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CounterUp } from './counter-up';

export default {
  component: CounterUp,
  title: 'Components/CounterUp',
} as ComponentMeta<typeof CounterUp>;

const Template: ComponentStory<typeof CounterUp> = (args) => (
  <CounterUp {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'counter up',
  from: 0,
  to: 50,
};
