// import styles from './line-chart.module.css';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@yak-twitter-app/shared-lib';
import { Chart, ChartData, ChartOptions, registerables, Tick } from 'chart.js';
import { chartDefaultOptions } from './data';

Chart.register(...registerables);

export interface LineChartProps {
  options?: ChartOptions<'line'>;
  data: ChartData<'line'>;
  scales: {
    min: number;
    max: number;
  };
  tickCallback: (
    tickValue: string | number,
    index: number,
    ticks: Tick[]
  ) => string | number | string[] | number[] | null | undefined;
}

export function LineChart({
  data,
  options = chartDefaultOptions,
  scales,
  tickCallback,
}: LineChartProps) {
  const [theme] = useTheme();

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
        ticks: {
          color: theme === 'dark' ? '#e7e9ea' : '#595959',
          callback: tickCallback,
        },
        min: scales.min,
        max: scales.max,
        grid: {
          borderColor: theme === 'dark' ? '#979797' : '#e5e5e5',
          color: theme === 'dark' ? '#979797' : '#e5e5e5',
        },
      },
    },
  };

  return <Line datasetIdKey="id" data={cData} options={cOptions} />;
}

export default LineChart;
