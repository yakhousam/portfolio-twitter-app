import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { chartDefaultOptions } from './data';
import { memo } from 'react';

Chart.register(...registerables);

export interface LineChartProps {
  chartRef: any;
}

export const LineChart = memo(function ({ chartRef }: LineChartProps) {
  return (
    <Line
      ref={chartRef}
      datasetIdKey="chartId"
      data={{ labels: [], datasets: [{ data: [] }] }}
      options={chartDefaultOptions}
    />
  );
});

export default LineChart;
