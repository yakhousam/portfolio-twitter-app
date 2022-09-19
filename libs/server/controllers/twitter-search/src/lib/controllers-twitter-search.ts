import { NextFunction, Request, Response } from 'express';
import {
  getTweetsStats,
  getMostEngagedTweets,
  getRankedAccounts,
} from '@yak-twitter-app/utility/tweets';
import {
  IUser,
  SearchHashtagReturnData,
  TwitterApiResponse,
} from '@yak-twitter-app/types';
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
    const client = new TwitterApi({
      appKey: process.env.TWITTER_CONSUMER_KEY,
      appSecret: process.env.TWITTER_CONSUMER_SECRET,
      accessToken: user.token,
      accessSecret: user.tokenSecret,
    });
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
    const result = await client.v2.get<TwitterApiResponse>(
      'tweets/search/recent',
      options,
      {
        fullResponse: true,
      }
    );
    if (result.data.meta.result_count === 0) {
      return res.sendStatus(404);
    }
    console.log(result);
    const response: SearchHashtagReturnData = {
      ...getTweetsStats(result.data.data),
      rateLimit: { ...result.rateLimit, reset: result.rateLimit.reset * 1000 },
      rankedAccounts: getRankedAccounts(result.data.includes.users),
      mostEngagedTweets: getMostEngagedTweets(result.data.data),
      chartData: result.data.data.map((tweet) => tweet.created_at),
      nextToken: result.data.meta.next_token,
    };
    return res.json(response);
  } catch (error) {
    //console.error(error);
    return next(error);
  }
}
