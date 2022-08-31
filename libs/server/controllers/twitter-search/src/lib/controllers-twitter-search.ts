import { NextFunction, Request, Response } from 'express';
import {
  getTweetsStats,
  getMostEngagedTweets,
  getRankedAccounts,
} from '@yak-twitter-app/utility/tweets';
import { getTwitterApiClient } from './twitter_client';
import { sleep } from '@yak-twitter-app/utility/helpers';
import { SearchHashtagReturnData } from '@yak-twitter-app/types';

//TODO: compress  the response
export type SearchRequest = Request<
  { hashtag: string },
  unknown,
  unknown,
  { startTime?: string; endTime?: string }
>;

export async function searchByHashtag(
  req: SearchRequest,
  res: Response,
  next: NextFunction
) {
  const { hashtag } = req.params;
  const { startTime, endTime } = req.query;

  const maxResultsPerPage = 100; // between 10 and 100
  // handle client cancle request
  let cancelRequest = false;
  req.on('close', () => {
    if (req.aborted) {
      cancelRequest = true;
      console.log('request aborted by the client');
    }
  });

  try {
    const client = getTwitterApiClient();
    let result = await client.v2.search(`#${hashtag} lang:en`, {
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
    });
    do {
      const response: SearchHashtagReturnData = {
        ...getTweetsStats(result.tweets),
        rateLimit: {
          ...result.rateLimit,
          reset: result.rateLimit.reset * 1000, // convert seconds to milliseconds
        },
        rankedAccounts: getRankedAccounts(result.includes.users),
        mostEngagedTweets: getMostEngagedTweets(result.tweets),
        chartData: result.tweets.map((tweet) => tweet.created_at),
      };
      res.write(JSON.stringify(response));
      // if rate limit exceeded, wait untill time reset
      if (result.rateLimit.remaining === 0) {
        const sleeptime = result.rateLimit.reset * 1000 - Date.now();
        await sleep(sleeptime);
      }
      if (!result.done) {
        result = await result.next(); // fetch the next page
      }
    } while (!result.done && !cancelRequest);

    // call res.end to close the connection
    return res.end();
  } catch (error) {
    return next(error);
  }
}
