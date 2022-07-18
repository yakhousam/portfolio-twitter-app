import { ChartDataLine, Data, Statistics } from '../interfaces';
import { TweetV2, UserV2 } from 'twitter-api-v2';
import {
  dateRange15min,
  dateRange1Day,
  dateRange1hour,
  dateRange30min,
  dateRange4hour,
  dateRange5min,
  TimeFrame,
} from '../helpers/date-helpers';

export function analyzeTweets(tweets: TweetV2[]): Statistics {
  const stats = tweets.reduce(
    (acc: Statistics, tweet) => {
      if (tweet.in_reply_to_user_id) {
        acc.replay += 1;
      } else if (tweet.text.startsWith('RT')) {
        acc.retweet += 1;
      } else {
        acc.original += 1;
      }
      if (tweet.created_at) {
        acc.chartData.push(tweet.created_at);
      }

      // const createdAt = tweet.created_at;
      // if (!createdAt) {
      //   return acc;
      // }

      // const m5 = dateRange5min(createdAt);
      // const m15 = dateRange15min(createdAt);
      // const m30 = dateRange30min(createdAt);
      // const h1 = dateRange1hour(createdAt);
      // const h4 = dateRange4hour(createdAt);
      // const d1 = dateRange1Day(createdAt);

      // if (m5) {
      //   const index = acc.chart.m5.findIndex((el) => el.x === m5);
      //   if (index > -1) acc.chart.m5[index]['y'] += 1;
      //   else acc.chart.m5.push({ x: m5, y: 1 });
      // }
      // if (m15) {
      //   const index = acc.chart.m15.findIndex((el) => el.x === m15);
      //   if (index > -1) acc.chart.m15[index]['y'] += 1;
      //   else acc.chart.m15.push({ x: m15, y: 1 });
      // }

      // if (m30) {
      //   const index = acc.chart.m30.findIndex((el) => el.x === m30);
      //   if (index > -1) acc.chart.m30[index]['y'] += 1;
      //   else acc.chart.m30.push({ x: m30, y: 1 });
      // }
      // if (h1) {
      //   const index = acc.chart.h1.findIndex((el) => el.x === h1);
      //   if (index > -1) acc.chart.h1[index]['y'] += 1;
      //   else acc.chart.h1.push({ x: h1, y: 1 });
      // }
      // if (h4) {
      //   const index = acc.chart.h4.findIndex((el) => el.x === h4);
      //   if (index > -1) acc.chart.h4[index]['y'] += 1;
      //   else acc.chart.h4.push({ x: h4, y: 1 });
      // }
      // if (d1) {
      //   const index = acc.chart.d1.findIndex((el) => el.x === d1);
      //   if (index > -1) acc.chart.d1[index]['y'] += 1;
      //   else acc.chart.d1.push({ x: d1, y: 1 });
      //}

      return acc;
    },
    {
      original: 0,
      replay: 0,
      retweet: 0,
      chartData: [],
    }
  );

  // for (const range of Object.keys(stats.chart) as Array<
  //   keyof Statistics['chart']
  // >) {
  //   fillEmptyDate(stats.chart[range], range);
  // }

  return stats;
}

// export function fillEmptyDateChart(data){

// }

export function fillEmptyDate(arr: Data[], key: string) {
  // arr.sort((a, b) => (a.x < b.x ? -1 : 1));
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
  // console.log({ arr });
}

export function getRankedAccounts(users: Array<UserV2>) {
  return users
    .filter((user, i, arr) => i === arr.findIndex((el) => el.id === user.id))
    .sort((a, b) => {
      if (!a.public_metrics?.followers_count) {
        return 1;
      }
      if (!b.public_metrics?.followers_count) {
        return -1;
      }
      return (
        b.public_metrics.followers_count - a.public_metrics.followers_count
      );
    })
    .slice(0, 6);
  // .map((user) => user.id);
}

export function getTweetsByUsers(users: Array<UserV2>, tweets: Array<TweetV2>) {
  const visited = new Set();
  const res: Array<TweetV2> = [];
  const usersIds = new Set(users.map((user) => user.id));
  for (const tweet of tweets) {
    if (
      !visited.has(tweet.author_id) &&
      tweet.author_id &&
      usersIds.has(tweet.author_id)
    ) {
      res.push(tweet);
      visited.add(tweet.author_id);
    }
  }
  return res;
}

export function getMostEngagedTweets(tweets: Array<TweetV2>, count = 6) {
  const result: Array<{ count: number; tweet: TweetV2 }> = [];
  for (const tweet of tweets) {
    const count =
      (tweet.public_metrics?.like_count || 0) +
      (tweet.public_metrics?.reply_count || 0) +
      (tweet.public_metrics?.retweet_count || 0);
    result.push({ tweet: tweet, count: count });
  }
  result.sort((a, b) => b.count - a.count);
  return result.map(({ tweet }) => tweet).slice(0, count);
}

// this function is made to combine css classes
export function clsx(...args: string[]) {
  return args.join(' ');
}

export function combineChartData(
  oldData: Record<TimeFrame, ChartDataLine> | null,
  newData: Array<string>
) {
  if (oldData === null) {
    return formatChartData(newData);
  }
  // console.log('newData before sorting', { newData });
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
  // console.log('newData after sorting', { newData });
  console.log({
    newDataStart: new Date(newData[0]).toLocaleString(),
    newDataEnd: new Date(newData[newData.length - 1]).toLocaleString(),
    oldDataStart: oldData.m5.labels[0],
    oldData: oldData.m5.labels[oldData.m5.labels.length - 1],
  });

  const newChartData = formatChartData(newData);
  for (const [timeframe, data] of Object.entries(newChartData)) {
    // check if the first label on oldData is equal to the last label newData => duplicated
    // labels are sorted, we only need to check the first element
    // if (timeframe === 'h1') {
    //   console.log(
    //     'combine data duplicate found',
    //     timeframe,
    //     oldData[timeframe as TimeFrame].labels,
    //     data.labels
    //   );
    // }

    if (
      oldData[timeframe as TimeFrame].labels[0] ===
      data.labels[data.labels.length - 1]
    ) {
      oldData[timeframe as TimeFrame].datasets[0].data[0] +=
        data.datasets[0].data[data.datasets[0].data.length - 1];
      oldData[timeframe as TimeFrame].labels = [
        ...data.labels,
        ...oldData[timeframe as TimeFrame].labels.slice(1),
      ];
      oldData[timeframe as TimeFrame].datasets[0].data = [
        ...data.datasets[0].data,
        ...oldData[timeframe as TimeFrame].datasets[0].data.slice(1),
      ];
    } else {
      oldData[timeframe as TimeFrame].labels = [
        ...data.labels,
        ...oldData[timeframe as TimeFrame].labels,
      ];
      oldData[timeframe as TimeFrame].datasets[0].data = [
        ...data.datasets[0].data,
        ...oldData[timeframe as TimeFrame].datasets[0].data,
      ];
    }
  }
  return oldData;
}

export function formatChartData(
  data: Array<string>
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

  return {
    m5: getChartData(hashMap.m5, 'm5'),
    m15: getChartData(hashMap.m15, 'm15'),
    m30: getChartData(hashMap.m30, 'm30'),
    h1: getChartData(hashMap.h1, 'h1'),
    h4: getChartData(hashMap.h4, 'h4'),
    d1: getChartData(hashMap.d1, 'd1'),
  };
}

export function getChartData(data: Record<string, number>, key: TimeFrame) {
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
