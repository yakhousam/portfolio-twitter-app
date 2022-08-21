import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Chart } from 'chart.js';
import { useEffect, useRef } from 'react';
import { chartDefaultData, chartDefaultOptions } from './data';
import { LineChart } from './line-chart';

export default {
  component: LineChart,
  title: 'components/LineChart',
} as ComponentMeta<typeof LineChart>;

export const Default: ComponentStory<typeof LineChart> = (args) => {
  return <LineChart {...args} />;
};

Default.decorators = [
  (Story) => {
    const chartRef = useRef<Chart<'line'>>();
    useEffect(() => {
      if (!chartRef.current) return;
      chartRef.current.data = chartDefaultData;
      chartRef.current.config.options = chartDefaultOptions;
      chartRef.current.update();
    }, []);
    return <Story args={{ chartRef }} />;
  },
];
