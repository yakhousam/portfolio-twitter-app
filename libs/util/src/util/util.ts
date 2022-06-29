import { Statistics } from '../interfaces';
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
  return tweets.reduce(
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

      if (m5) acc.chart.m5[m5] = acc.chart.m5[m5] ? acc.chart.m5[m5] + 1 : 1;
      if (m15)
        acc.chart.m15[m15] = acc.chart.m15[m15] ? acc.chart.m15[m15] + 1 : 1;
      if (m30)
        acc.chart.m30[m30] = acc.chart.m30[m30] ? acc.chart.m30[m30] + 1 : 1;
      if (h1) acc.chart.h1[h1] = acc.chart.h1[h1] ? acc.chart.h1[h1] + 1 : 1;
      if (h4) acc.chart.h4[h4] = acc.chart.h4[h4] ? acc.chart.h4[h4] + 1 : 1;
      if (d1) acc.chart.d1[d1] = acc.chart.d1[d1] ? acc.chart.d1[d1] + 1 : 1;

      return acc;
    },
    {
      original: 0,
      replay: 0,
      retweet: 0,
      chart: {
        m5: {},
        m15: {},
        m30: {},
        h1: {},
        h4: {},
        d1: {},
      },
    }
  );
}

export function getTopFiveUsers(users: UserV2[]) {
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
    .slice(0, 5);
}
