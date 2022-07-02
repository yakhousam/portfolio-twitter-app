import styles from './line-chart.module.css';
import { Line } from 'react-chartjs-2';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
Chart.register(...registerables);

export interface LineChartProps {
  options: ChartOptions<'line'>;
  data: ChartData<'line'>;
}

export function LineChart({ data, options }: LineChartProps) {
  return (
    <div>
      <Line datasetIdKey="id" data={data} options={options} />
    </div>
  );
}

export default LineChart;
