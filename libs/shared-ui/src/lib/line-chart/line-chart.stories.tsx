import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LineChart } from './line-chart';
import { chartDefaultData, chartDefaultOptions } from './data';

export default {
  component: LineChart,
  title: 'components/LineChart',
} as ComponentMeta<typeof LineChart>;

const Template: ComponentStory<typeof LineChart> = (args) => (
  <LineChart {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  data: chartDefaultData,
  options: chartDefaultOptions,
};
