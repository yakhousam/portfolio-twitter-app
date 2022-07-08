import { Data, Statistics } from '../interfaces';
import { TweetV2, UserV2 } from 'twitter-api-v2';
import {
  dateRange15min,
  dateRange1Day,
  dateRange1hour,
  dateRange30min,
  dateRange4hour,
  dateRange5min,
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
      const createdAt = tweet.created_at;
      if (!createdAt) {
        return acc;
      }
      const m5 = dateRange5min(createdAt);
      const m15 = dateRange15min(createdAt);
      const m30 = dateRange30min(createdAt);
      const h1 = dateRange1hour(createdAt);
      const h4 = dateRange4hour(createdAt);
      const d1 = dateRange1Day(createdAt);

      if (m5) {
        const index = acc.chart.m5.findIndex((el) => el.x === m5);
        if (index > -1) acc.chart.m5[index]['y'] += 1;
        else acc.chart.m5.push({ x: m5, y: 1 });
      }
      if (m15) {
        const index = acc.chart.m15.findIndex((el) => el.x === m15);
        if (index > -1) acc.chart.m15[index]['y'] += 1;
        else acc.chart.m15.push({ x: m15, y: 1 });
      }

      if (m30) {
        const index = acc.chart.m30.findIndex((el) => el.x === m30);
        if (index > -1) acc.chart.m30[index]['y'] += 1;
        else acc.chart.m30.push({ x: m30, y: 1 });
      }
      if (h1) {
        const index = acc.chart.h1.findIndex((el) => el.x === h1);
        if (index > -1) acc.chart.h1[index]['y'] += 1;
        else acc.chart.h1.push({ x: h1, y: 1 });
      }
      if (h4) {
        const index = acc.chart.h4.findIndex((el) => el.x === h4);
        if (index > -1) acc.chart.h4[index]['y'] += 1;
        else acc.chart.h4.push({ x: h4, y: 1 });
      }
      if (d1) {
        const index = acc.chart.d1.findIndex((el) => el.x === d1);
        if (index > -1) acc.chart.d1[index]['y'] += 1;
        else acc.chart.d1.push({ x: d1, y: 1 });
      }

      return acc;
    },
    {
      original: 0,
      replay: 0,
      retweet: 0,
      chart: {
        m5: [],
        m15: [],
        m30: [],
        h1: [],
        h4: [],
        d1: [],
      },
    }
  );

  for (const range of Object.keys(stats.chart) as Array<
    keyof Statistics['chart']
  >) {
    fillEmptyDate(stats.chart[range], range);
  }

  return stats;
}
export function fillEmptyDate(arr: Data[], key: keyof Statistics['chart']) {
  arr.sort((a, b) => (a.x < b.x ? -1 : 1));
  const tmp = [];
  for (let i = 0; i < arr.length - 1; i++) {
    const date1 = new Date(arr[i].x);
    const date2 = new Date(arr[i + 1].x);
    switch (key) {
      case 'm5': {
        date1.setMinutes(date1.getMinutes() + 5);
        while (date1.getTime() < date2.getTime()) {
          tmp.push({ x: date1.toISOString(), y: 0 });
          date1.setMinutes(date1.getMinutes() + 5);
        }
        break;
      }
      case 'm15': {
        date1.setMinutes(date1.getMinutes() + 15);
        while (date1.getTime() < date2.getTime()) {
          tmp.push({ x: date1.toISOString(), y: 0 });
          date1.setMinutes(date1.getMinutes() + 15);
        }
        break;
      }
      case 'm30': {
        date1.setMinutes(date1.getMinutes() + 30);
        while (date1.getTime() < date2.getTime()) {
          tmp.push({ x: date1.toISOString(), y: 0 });
          date1.setMinutes(date1.getMinutes() + 30);
        }
        break;
      }
      case 'h1': {
        date1.setHours(date1.getHours() + 1);
        while (date1.getTime() < date2.getTime()) {
          tmp.push({ x: date1.toISOString(), y: 0 });
          date1.setHours(date1.getHours() + 1);
        }
        break;
      }
      case 'h4': {
        date1.setHours(date1.getHours() + 4);
        while (date1.getTime() < date2.getTime()) {
          tmp.push({ x: date1.toISOString(), y: 0 });
          date1.setHours(date1.getHours() + 4);
        }
        break;
      }
      case 'd1': {
        date1.setDate(date1.getDate() + 1);
        while (date1.getTime() < date2.getTime()) {
          tmp.push({ x: date1.toISOString(), y: 0 });
          date1.setDate(date1.getDate() + 1);
        }
        break;
      }
      default:
        break;
    }
  }
  arr.push(...tmp);
  arr.sort((a, b) => (a.x < b.x ? -1 : 1));
  // console.log({ arr });
}

export function getTopUsersIds(users: Array<UserV2>) {
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
    .slice(0, 6)
    .map((user) => user.id);
}

export function getTopUsersTweetIds(
  usersIds: Array<string>,
  tweets: Array<TweetV2>
): Array<string> {
  const visited = new Set();
  const res: Array<string> = [];
  for (const tweet of tweets) {
    if (
      !visited.has(tweet.author_id) &&
      usersIds.includes(tweet.author_id as string)
    ) {
      res.push(tweet.id);
      visited.add(tweet.author_id);
    }
  }
  return res;
}

// this function is made to combine css classes
export function clsx(...args: string[]) {
  return args.join(' ');
}
