import styles from './line-chart.module.css';
import data from './data';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

/* eslint-disable-next-line */
export interface LineChartProps {}

export function LineChart(props: LineChartProps) {
  return (
    <div>
      <Line datasetIdKey="id" data={data} options={options} />
    </div>
  );
}

export default LineChart;
