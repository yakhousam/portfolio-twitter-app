import { NextFunction, Request, Response } from 'express';
import {
  analyzeTweets,
  getDefaultEndTime,
  getDefaultStartTime,
  getMostEngagedTweets,
  getRankedAccounts,
  getTweetsByUsers,
} from '@yak-twitter-app/shared-lib';
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

    console.log('request cancelled', req.complete);
  });

  try {
    const client = getTwitterApiClient();
    let result = await client.v2.search(`#${hashtag}`, {
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

    total += maxResultsPerPage;
    // console.log('%o', result);
    // return res.json(result.tweets);
    const rankedAccounts = getRankedAccounts(result.includes.users);

    // return res.json({
    //   ...analyzeTweets(result.tweets),
    //   rateLimit: result.rateLimit,
    //   rankedAccounts,
    //   rankedAccountsTweets: getTweetsByUsers(rankedAccounts, result.tweets),
    //   mostEngagedTweets: getMostEngagedTweets(result.tweets),
    // });
    res.write(
      JSON.stringify({
        ...analyzeTweets(result.tweets),
        rateLimit: result.rateLimit,
        rankedAccounts,
        rankedAccountsTweets: getTweetsByUsers(rankedAccounts, result.tweets),
        mostEngagedTweets: getMostEngagedTweets(result.tweets),
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
      const rankedAccounts = getRankedAccounts(result.includes.users);

      res.write(
        JSON.stringify({
          ...analyzeTweets(result.tweets),
          rateLimit: result.rateLimit,
          rankedAccounts,
          rankedAccountsTweets: getTweetsByUsers(rankedAccounts, result.tweets),
          mostEngagedTweets: getMostEngagedTweets(result.tweets),
        })
      );
    }
    // call res.end to close the connection
    return res.end();
  } catch (error) {
    return next(error);
  }
}
