import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LineChart } from './line-chart';

export default {
  component: LineChart,
  title: 'LineChart',
} as ComponentMeta<typeof LineChart>;

const Template: ComponentStory<typeof LineChart> = (args) => (
  <LineChart {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
