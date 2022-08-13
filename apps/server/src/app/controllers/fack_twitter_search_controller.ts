import { NextFunction, Request, Response } from 'express';
import {
  analyzeTweets,
  getMostEngagedTweets,
  getRankedAccounts,
  getTwitterData,
  sleep,
} from '@yak-twitter-app/shared-lib';

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
  // const { hashtag } = req.params;
  const { startTime, endTime } = req.query;

  // handle client cancle request
  let cancelRequest = false;
  req.on('close', () => {
    if (req.aborted) {
      cancelRequest = true;
      console.log('request aborted by the client');
    }
  });

  try {
    const diff = new Date(endTime).getTime() - new Date(startTime).getTime();
    const nbHours = Math.floor(diff / 1000 / 60 / 60);
    const resetDate = new Date();
    const remaining = 450;
    resetDate.setMinutes(resetDate.getMinutes() + 15);
    for (let i = 0; i < nbHours; i++) {
      if (cancelRequest) {
        break;
      }
      const end = new Date(endTime);
      const start = new Date(endTime);
      end.setHours(end.getHours() - i);
      start.setHours(start.getHours() - i - 1);
      const data = getTwitterData({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        reset: resetDate.getTime(),
        remaining: remaining - i - 1,
        maxResult: 100,
      });
      await sleep(1000);
      res.write(
        JSON.stringify({
          ...analyzeTweets(data.tweets),
          rateLimit: {
            ...data.rateLimit,
            reset: data.rateLimit.reset,
          },
          rankedAccounts: getRankedAccounts(data.includes.users),
          mostEngagedTweets: getMostEngagedTweets(data.tweets),
        })
      );
    }

    // call res.end to close the connection
    return res.end();
  } catch (error) {
    return next(error);
  }
}
