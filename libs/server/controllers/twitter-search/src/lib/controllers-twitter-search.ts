import { NextFunction, Request, Response } from 'express';
import { TwitterApiRateLimitPlugin } from '@twitter-api-v2/plugin-rate-limit';
import {
  getTweetsStats,
  getMostEngagedTweets,
  getRankedAccounts,
} from '@yak-twitter-app/utility/tweets';
import { IUser, SearchHashtagReturnData } from '@yak-twitter-app/types';
import { TwitterApi } from 'twitter-api-v2';

type IRequest = Request<
  { hashtag: string },
  unknown,
  unknown,
  { startTime?: string; endTime?: string; nextToken?: string }
>;
export type SearchRequest = IRequest & { user: IUser };

export async function searchByHashtag(
  req: SearchRequest,
  res: Response,
  next: NextFunction
) {
  const { hashtag } = req.params;
  const { startTime, endTime, nextToken } = req.query;

  const maxResultsPerPage = 100; // between 10 and 100

  const user = (req.user || {}) as IUser;

  try {
    const rateLimitPlugin = new TwitterApiRateLimitPlugin();
    const client = new TwitterApi(
      {
        appKey: process.env.TWITTER_CONSUMER_KEY,
        appSecret: process.env.TWITTER_CONSUMER_SECRET,
        accessToken: user.token,
        accessSecret: user.tokenSecret,
      },
      { plugins: [rateLimitPlugin] }
    );
    const options = {
      query: `#${hashtag} lang:en`,
      max_results: maxResultsPerPage,
      start_time: startTime,
      end_time: endTime,
      expansions: ['author_id', 'referenced_tweets.id'],
      'tweet.fields': [
        'id',
        'author_id',
        'in_reply_to_user_id',
        'created_at',
        'public_metrics',
      ],

      'user.fields': ['username', 'public_metrics'],
    };
    if (nextToken) {
      options['next_token'] = nextToken;
    }
    const result = await client.v2.get('tweets/search/recent', options);
    const currentRateLimit = await rateLimitPlugin.v2.getRateLimit(
      'tweets/search/recent'
    );

    const response: SearchHashtagReturnData = {
      ...getTweetsStats(result.data),
      rateLimit: currentRateLimit
        ? { ...currentRateLimit, reset: currentRateLimit.reset * 1000 }
        : { limit: 0, remaining: 0, reset: 0 },
      rankedAccounts: getRankedAccounts(result.includes.users),
      mostEngagedTweets: getMostEngagedTweets(result.data),
      chartData: result.data.map((tweet) => tweet.created_at),
      nextToken: result?.meta?.next_token as string,
    };
    return res.json(response);
  } catch (error) {
    // console.error(error);
    return next(error);
  }
}
