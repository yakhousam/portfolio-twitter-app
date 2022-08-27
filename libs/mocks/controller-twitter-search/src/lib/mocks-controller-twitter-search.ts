import { NextFunction, Request, Response } from 'express';
import {
  getTweetsStats,
  getMostEngagedTweets,
  getRankedAccounts,
} from '@yak-twitter-app/utility/tweets';
import { getTwitterData } from '@yak-twitter-app/mocks/tweets';
import { sleep } from '@yak-twitter-app/utility/helpers';
import { SearchHashtagReturnData } from '@yak-twitter-app/types';

const tweetsIds = [
  '1545260483980234753',
  '1545260274726453248',
  '1545260256636424194',
  '1545259630015774722',
  '1545258875993133056',
  '1545258356834721793',
];
const usersIds = [
  '1000814755664150528',
  '710123736175783938',
  '1098126456276828160',
  '2704581690',
  '1354693765940846594',
  '1142424032794406912',
];

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
    const limit = 30;
    let remaining = limit;
    resetDate.setMinutes(resetDate.getMinutes() + 1);
    let i = 0;
    while (i < nbHours) {
      if (cancelRequest) {
        break;
      }
      if (--remaining < 0) {
        const time = resetDate.getTime() - new Date().getTime();
        console.log('sleep time =', time);
        await sleep(time);
        remaining = limit;
        resetDate.setMinutes(resetDate.getMinutes() + 1);
      }
      const end = new Date(endTime);
      const start = new Date(endTime);
      const z = Math.floor(Math.random() * 2) + 1;
      end.setHours(end.getHours() - i);
      start.setHours(start.getHours() - i - z);
      const data = getTwitterData({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        reset: resetDate.getTime(),
        limit: limit,
        maxResult: 100,
      });
      await sleep(1000);
      const rankedAccounts = getRankedAccounts(data.includes.users);
      const mostEngagedTweets = getMostEngagedTweets(data.tweets);
      mostEngagedTweets.forEach((tweet, i) => {
        tweet.id = tweetsIds[i];
      });
      rankedAccounts.forEach((user, i) => {
        user.id = usersIds[i];
      });
      const response: SearchHashtagReturnData = {
        ...getTweetsStats(data.tweets),
        rateLimit: {
          ...data.rateLimit,
          reset: data.rateLimit.reset,
          remaining: remaining,
        },
        rankedAccounts,
        mostEngagedTweets,
        chartData: data.tweets.map((tweet) => tweet.created_at),
      };
      res.write(JSON.stringify(response));

      i += z;
    }

    // call res.end to close the connection
    return res.end();
  } catch (error) {
    return next(error);
  }
}
