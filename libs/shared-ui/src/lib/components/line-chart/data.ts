import { faker } from '@faker-js/faker';
import { ChartData, ChartOptions } from 'chart.js';

const xAxis = Array(100)
  .fill('')
  .map(() =>
    faker.date
      .between('2022-06-01T00:00:00.000Z', '2023-01-07T00:00:00.000Z')
      .toLocaleDateString()
  )
  .filter((el, i, arr) => arr.indexOf(el) === i)
  .sort((a, b) => (a < b ? -1 : 1));

export const chartDefaultData: ChartData<'line'> = {
  labels: xAxis,
  datasets: [
    {
      data: xAxis.map(() => faker.datatype.number(100)),
      borderColor: '#2d40e6b7',
    },
  ],
};

export const chartDefaultOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
};
