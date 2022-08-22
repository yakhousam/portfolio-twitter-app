import { ChartDataLine, Data, TimeFrame } from '@yak-twitter-app/types';
import {
  dateRange15min,
  dateRange1Day,
  dateRange1hour,
  dateRange30min,
  dateRange4hour,
  dateRange5min,
} from '@yak-twitter-app/utility/date';

export function combineChartData(
  oldData: Record<TimeFrame, ChartDataLine>,
  newData: Array<string>
) {
  // console.log({ oldData, newData });

  // TODO: think better way to do this
  if (oldData.d1.labels.length === 0) {
    const newChartData = formatChartData(newData);
    // console.log({ newChartData });
    return newChartData;
  }
  newData.sort((a, b) => {
    const a1 = new Date(a).getTime();
    const b1 = new Date(b).getTime();
    if (a1 < b1) {
      return -1;
    }
    if (a1 > b1) {
      return 1;
    }
    return 0;
  });
  // console.log({ newData });

  const newChartData = formatChartData(newData, {
    m5: oldData.m5.labels[0],
    m15: oldData.m15.labels[0],
    m30: oldData.m30.labels[0],
    h1: oldData.h1.labels[0],
    h4: oldData.h4.labels[0],
    d1: oldData.d1.labels[0],
  });
  // console.log({ newChartData });
  // need to deep copy oldData to avoid mutating state reducer
  const oldDataCopy: typeof oldData = {
    m5: {
      labels: oldData.m5.labels.slice(),
      datasets: [
        {
          data: oldData.m5.datasets[0].data.slice(),
        },
      ],
    },
    m15: {
      labels: oldData.m15.labels.slice(),
      datasets: [
        {
          data: oldData.m15.datasets[0].data.slice(),
        },
      ],
    },
    m30: {
      labels: oldData.m30.labels.slice(),
      datasets: [
        {
          data: oldData.m30.datasets[0].data.slice(),
        },
      ],
    },
    h1: {
      labels: oldData.h1.labels.slice(),
      datasets: [
        {
          data: oldData.h1.datasets[0].data.slice(),
        },
      ],
    },
    h4: {
      labels: oldData.h4.labels.slice(),
      datasets: [
        {
          data: oldData.h4.datasets[0].data.slice(),
        },
      ],
    },
    d1: {
      labels: oldData.d1.labels.slice(),
      datasets: [
        {
          data: oldData.d1.datasets[0].data.slice(),
        },
      ],
    },
  };
  for (const [timeframe, data] of Object.entries(newChartData)) {
    oldDataCopy[timeframe as TimeFrame].datasets[0].data[0] +=
      data.datasets[0].data[data.datasets[0].data.length - 1];
    oldDataCopy[timeframe as TimeFrame].labels = [
      ...data.labels,
      ...oldDataCopy[timeframe as TimeFrame].labels.slice(1),
    ];
    oldDataCopy[timeframe as TimeFrame].datasets[0].data = [
      ...data.datasets[0].data.slice(0, -1),
      ...oldDataCopy[timeframe as TimeFrame].datasets[0].data,
    ];
  }
  return oldDataCopy;
}

export function formatChartData(
  data: Array<string>,
  oldDataLastDates?: Record<TimeFrame, string>
): Record<TimeFrame, ChartDataLine> {
  const hashMap: Record<TimeFrame, Record<string, number>> = {
    m5: {},
    m15: {},
    m30: {},
    h1: {},
    h4: {},
    d1: {},
  };
  for (const createdAt of data) {
    const m5 = dateRange5min(createdAt);
    const m15 = dateRange15min(createdAt);
    const m30 = dateRange30min(createdAt);
    const h1 = dateRange1hour(createdAt);
    const h4 = dateRange4hour(createdAt);
    const d1 = dateRange1Day(createdAt);
    if (m5) {
      hashMap.m5[m5] = (hashMap.m5[m5] || 0) + 1;
    }
    if (m15) {
      hashMap.m15[m15] = (hashMap.m15[m15] || 0) + 1;
    }
    if (m30) {
      hashMap.m30[m30] = (hashMap.m30[m30] || 0) + 1;
    }
    if (h1) {
      hashMap.h1[h1] = (hashMap.h1[h1] || 0) + 1;
    }
    if (h4) {
      hashMap.h4[h4] = (hashMap.h4[h4] || 0) + 1;
    }
    if (d1) {
      hashMap.d1[d1] = (hashMap.d1[d1] || 0) + 1;
    }
  }
  // ex: oldDataLasDate.h1 = 18:00 and newdataHighDate.h1 = 15:00
  // we need to add the hours between 15:00 and 18:00. so there will be no gap in the chart
  if (oldDataLastDates) {
    for (const [timeframe, stringDate] of Object.entries(oldDataLastDates)) {
      if (!hashMap[timeframe as TimeFrame][stringDate]) {
        hashMap[timeframe as TimeFrame][stringDate] = 0;
      }
    }
  }

  return {
    m5: getChartData(hashMap.m5, 'm5'),
    m15: getChartData(hashMap.m15, 'm15'),
    m30: getChartData(hashMap.m30, 'm30'),
    h1: getChartData(hashMap.h1, 'h1'),
    h4: getChartData(hashMap.h4, 'h4'),
    d1: getChartData(hashMap.d1, 'd1'),
  };
}

function getChartData(data: Record<string, number>, key: TimeFrame) {
  const arr = Object.entries(data)
    .sort(([key1], [key2]) =>
      new Date(key1).getTime() < new Date(key2).getTime() ? -1 : 1
    )
    .map(([key, val]) => ({ x: key, y: val }));

  const res = fillEmptyDate(arr, key);

  return {
    labels: res.map(({ x }) => x),
    datasets: [
      {
        data: res.map(({ y }) => y),
      },
    ],
  };
}

function fillEmptyDate(arr: Data[], key: string) {
  arr.sort((a, b) =>
    new Date(a.x).getTime() < new Date(b.x).getTime() ? -1 : 1
  );
  const tmp = [];
  for (let i = 0; i < arr.length - 1; i++) {
    const date1 = new Date(arr[i].x);
    const date2 = new Date(arr[i + 1].x);
    switch (key) {
      case 'm5': {
        date1.setMinutes(date1.getMinutes() + 5);
        while (date1.getTime() < date2.getTime()) {
          tmp.push({ x: date1.toLocaleString(), y: 0 });
          date1.setMinutes(date1.getMinutes() + 5);
        }
        break;
      }
      case 'm15': {
        date1.setMinutes(date1.getMinutes() + 15);
        while (date1.getTime() < date2.getTime()) {
          tmp.push({ x: date1.toLocaleString(), y: 0 });
          date1.setMinutes(date1.getMinutes() + 15);
        }
        break;
      }
      case 'm30': {
        date1.setMinutes(date1.getMinutes() + 30);
        while (date1.getTime() < date2.getTime()) {
          tmp.push({ x: date1.toLocaleString(), y: 0 });
          date1.setMinutes(date1.getMinutes() + 30);
        }
        break;
      }
      case 'h1': {
        date1.setHours(date1.getHours() + 1);
        while (date1.getTime() < date2.getTime()) {
          tmp.push({ x: date1.toLocaleString(), y: 0 });
          date1.setHours(date1.getHours() + 1);
        }
        break;
      }
      case 'h4': {
        date1.setHours(date1.getHours() + 4);
        while (date1.getTime() < date2.getTime()) {
          tmp.push({ x: date1.toLocaleString(), y: 0 });
          date1.setHours(date1.getHours() + 4);
        }
        break;
      }
      case 'd1': {
        date1.setDate(date1.getDate() + 1);
        while (date1.getTime() < date2.getTime()) {
          tmp.push({ x: date1.toLocaleString(), y: 0 });
          date1.setDate(date1.getDate() + 1);
        }
        break;
      }
      default:
        break;
    }
  }
  return [...arr, ...tmp].sort((a, b) =>
    new Date(a.x).getTime() < new Date(b.x).getTime() ? -1 : 1
  );
}
