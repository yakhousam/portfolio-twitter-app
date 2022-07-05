// import styles from './line-chart.module.css';
import { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@yak-twitter-app/shared-lib';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables);

export interface LineChartProps {
  options: ChartOptions<'line'>;
  data: ChartData<'line'>;
  scales: {
    min: number;
    max: number;
  };
}

export function LineChart({ data, options, scales }: LineChartProps) {
  const [theme] = useTheme();
  const chartRef = useRef<Chart<'line'>>(null);

  const cData: ChartData<'line'> = {
    ...data,
    datasets: data.datasets.map((d) => ({
      ...d,
      borderColor: theme === 'dark' ? '#1d9bf0' : '#2d40e6',
    })),
  };
  const cOptions: ChartOptions<'line'> = {
    ...options,
    scales: {
      y: {
        ticks: {
          color: theme === 'dark' ? '#e7e9ea' : '#595959',
        },
        beginAtZero: true,
        grid: {
          borderColor: theme === 'dark' ? '#979797' : '#e5e5e5',
          color: theme === 'dark' ? '#979797' : '#e5e5e5',
        },
      },
      x: {
        ticks: { color: theme === 'dark' ? '#e7e9ea' : '#595959' },
        min: scales.min,
        max: scales.max,
        grid: {
          borderColor: theme === 'dark' ? '#979797' : '#e5e5e5',
          color: theme === 'dark' ? '#979797' : '#e5e5e5',
        },
      },
    },
  };

  return (
    <Line ref={chartRef} datasetIdKey="id" data={cData} options={cOptions} />
  );
}

export default LineChart;
