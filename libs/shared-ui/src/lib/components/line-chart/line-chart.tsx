import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { chartDefaultOptions } from './data';
import { memo } from 'react';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';

Chart.register(...(registerables || []));

export interface LineChartProps {
  chartRef: React.Ref<ChartJSOrUndefined<'line'>>;
}

export const LineChart = memo(function ({ chartRef }: LineChartProps) {
  return (
    <Line
      ref={chartRef}
      datasetIdKey="chartId"
      data={{ labels: [], datasets: [{ data: [] }] }}
      options={chartDefaultOptions}
      aria-label="tweets line chart"
    />
  );
});

export default LineChart;
