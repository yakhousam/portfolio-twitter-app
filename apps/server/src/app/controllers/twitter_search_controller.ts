import { NextFunction, Request, Response } from 'express';
import {
  analyzeTweets,
  getMostEngagedTweets,
  getRankedAccounts,
  sleep,
} from '@yak-twitter-app/shared-lib';
import getTwitterApiClient from './twitter_client';

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
    console.log('before while loop');
    console.log('result done', result.done);
    console.log(result.rateLimit.limit);
    while (!result.done && !cancelRequest) {
      // console.log('inside while loop');
      // console.log(result.rateLimit.remaining);
      const rankedAccounts = getRankedAccounts(result.includes.users);
      const stat = analyzeTweets(result.tweets);
      const jsonResponse = JSON.stringify({
        ...stat,
        rateLimit: {
          ...result.rateLimit,
          reset: result.rateLimit.reset * 1000,
        },
        rankedAccounts,
        mostEngagedTweets: getMostEngagedTweets(result.tweets),
      });
      res.write(jsonResponse);
      if (result.rateLimit.remaining === 0) {
        const sleeptime = result.rateLimit.reset * 1000 - Date.now();
        await sleep(sleeptime);
      }
      result = await result.next(); // fetch the next page
    }
    // call res.end to close the connection
    // console.log('ending the response');
    return res.end();
  } catch (error) {
    return next(error);
  }
}
