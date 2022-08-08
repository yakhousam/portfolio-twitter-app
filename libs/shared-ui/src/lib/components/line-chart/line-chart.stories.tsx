import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LineChart } from './line-chart';

export default {
  component: LineChart,
  title: 'components/LineChart',
} as ComponentMeta<typeof LineChart>;

export const Default: ComponentStory<typeof LineChart> = (args) => {
  return <LineChart {...args} />;
};
