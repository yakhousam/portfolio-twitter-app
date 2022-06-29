import { NextFunction, Request, Response } from 'express';
import {
  analyzeTweets,
  getDefaultEndTime,
  getDefaultStartTime,
  getTopFiveUsers,
} from '@khoudir-yaya/twitter-hashtag-backend/util';
import getTwitterApiClient from './twitter_client';

export type SearchRequest = Request<
  { hashtag: string },
  unknown,
  unknown,
  { maxResults?: number; startTime?: string; endTime?: string }
>;

export async function searchByHashtag(
  req: SearchRequest,
  res: Response,
  next: NextFunction
) {
  const { hashtag } = req.params;
  const {
    maxResults = Number.MAX_SAFE_INTEGER,
    startTime = getDefaultStartTime(),
    endTime = getDefaultEndTime(),
  } = req.query;
  /** total number of tweets, we increment it after each pagination in the while loop bellow */
  let total = 0;
  const maxResultsPerPage = 100; // cannot be greater than 100
  // handle client cancle request
  let cancelRequest = false;
  req.on('close', () => {
    cancelRequest = true;
  });

  try {
    const client = getTwitterApiClient();
    let result = await client.v2.search(`#${hashtag}`, {
      max_results: maxResultsPerPage,
      start_time: startTime,
      end_time: endTime,
      expansions: 'author_id',
      'tweet.fields': [
        'id',
        'author_id',
        'in_reply_to_user_id',
        'created_at',
        'public_metrics',
      ],
      'user.fields': ['username', 'public_metrics'],
    });

    total += maxResultsPerPage;
    // console.log("%o", result);

    res.write(
      JSON.stringify({
        ...analyzeTweets(result.tweets),
        rateLimit: result.rateLimit,
        topFiveUsers: getTopFiveUsers(result.includes.users),
      })
    );

    while (
      !result.done &&
      total < maxResults &&
      result.rateLimit.remaining > 0 &&
      !cancelRequest
    ) {
      // eslint-disable-next-line no-await-in-loop
      result = await result.next(); // fetch the next page
      total += maxResultsPerPage;
      // console.log("total =", total);
      res.write(
        JSON.stringify({
          ...analyzeTweets(result.tweets),
          rateLimit: result.rateLimit,
          topFiveUsers: getTopFiveUsers(result.includes.users),
        })
      );
    }
    // call res.end to close the connection
    return res.end();
  } catch (error) {
    return next(error);
  }
}
