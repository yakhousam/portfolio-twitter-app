import { ChartOptions } from 'chart.js';
import { formatDate, getOffset, TimeFrame } from './date-helpers';

export function getChartScales(
  data: Array<string>,
  timeFrame: TimeFrame,
  step: number
) {
  let minScale = 0,
    maxScale = 0;
  const offset = getOffset(timeFrame);
  const calcMin = data.length - offset - offset * step;
  const calcMax = data.length - offset * step;
  if (calcMin < 0) {
    minScale = 0;
  } else if (calcMin > data.length - offset) {
    minScale = data.length - offset;
  } else {
    minScale = calcMin;
  }
  if (calcMax < offset) {
    maxScale = offset;
  } else if (calcMax > data.length) {
    maxScale = data.length;
  } else {
    maxScale = calcMax;
  }
  return { min: minScale, max: maxScale };
}

export function getChartOptions(
  data: Array<string>,
  timeFrame: TimeFrame,
  step: number
): ChartOptions<'line'> {
  console.log({ data });
  const { min, max } = getChartScales(data, timeFrame, step);
  const colorText = getComputedStyle(document.body).getPropertyValue(
    '--chart-tick-color'
  );
  const gridColor = getComputedStyle(document.body).getPropertyValue(
    '--chart-grid-color'
  );
  console.log({ colorText, gridColor });

  return {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        ticks: {
          color: colorText,
        },
        beginAtZero: true,
        grid: {
          borderColor: gridColor,
          color: gridColor,
        },
      },
      x: {
        ticks: {
          color: colorText,
          callback: (value: string | number) => {
            const label = data[Number(value)];
            const date = new Date(label);
            return formatDate(date, timeFrame);
          },
        },
        min,
        max,
        grid: {
          borderColor: gridColor,
          color: gridColor,
        },
      },
    },
  };
}
