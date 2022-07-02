import { faker } from '@faker-js/faker';
import { ChartData, ChartOptions } from 'chart.js';

const xAxis = Array(2000)
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
      borderColor: '#2d40e6',
      data: xAxis.map(() => faker.datatype.number(100)),
    },
  ],
};

export const chartDefaultOptions: ChartOptions<'line'> = {
  plugins: {
    title: { text: 'Line Chart Example', display: true },
    legend: { display: false },
  },
};
