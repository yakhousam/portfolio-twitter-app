import { TweetsStats } from '@yak-twitter-app/types';
import { TweetV2, UserV2 } from 'twitter-api-v2';

export function getTweetsStats(tweets: TweetV2[]) {
  return tweets.reduce(
    (acc: TweetsStats, tweet) => {
      if (tweet.in_reply_to_user_id) {
        acc.replay += 1;
      } else if (tweet.text.startsWith('RT')) {
        acc.retweet += 1;
      } else {
        acc.original += 1;
      }
      return acc;
    },
    {
      original: 0,
      replay: 0,
      retweet: 0,
    }
  );
}

export function getRankedAccounts(users: Array<UserV2>, maxResult = 6) {
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
    .slice(0, maxResult);
}

export function getMostEngagedTweets(tweets: Array<TweetV2>, maxResult = 6) {
  // console.log('get most engaged tweets', { tweets });
  const hashSet = new Set();
  const result: Array<{ count: number; tweet: TweetV2 }> = [];
  for (const tweet of tweets) {
    const tweetId = tweet.referenced_tweets
      ? tweet.referenced_tweets[0].id
      : tweet.id;
    if (!hashSet.has(tweetId)) {
      hashSet.add(tweetId);
      const count =
        (tweet.public_metrics?.like_count || 0) +
        (tweet.public_metrics?.reply_count || 0) +
        (tweet.public_metrics?.retweet_count || 0);
      result.push({
        tweet: tweet.referenced_tweets
          ? {
              ...tweet,
              id: tweetId,
              in_reply_to_user_id: undefined,
              referenced_tweets: undefined,
            }
          : tweet,
        count,
      });
    }
  }
  result.sort((a, b) => b.count - a.count);
  return result.map(({ tweet }) => tweet).slice(0, maxResult);
}
