import { ChartData } from 'chart.js';
import { ApiV2Includes, TweetV2, UserV2 } from 'twitter-api-v2';

export interface Data {
  x: string;
  y: number;
}

export interface StatChartData {
  m5: Data[];
  m15: Data[];
  m30: Data[];
  h1: Data[];
  h4: Data[];
  d1: Data[];
}

export interface TweetsStats {
  original: number;
  replay: number;
  retweet: number;
}

export interface SearchHashtagReturnData extends TweetsStats {
  rateLimit: {
    limit: number;
    reset: number;
    remaining: number;
  };
  rankedAccounts: UserV2[];
  mostEngagedTweets: TweetV2[];
  chartData: Array<string>;
  nextToken: string | undefined;
}
export interface ChartDataLine extends ChartData<'line'> {
  labels: Array<string>;
  datasets: Array<{ data: Array<number> }>;
}

export interface SearchForm {
  hashtag: string;
  startDate: string;
  endDate: string;
  errors: {
    hashtag: boolean;
  };
}

export type TimeFrame = 'd1' | 'h4' | 'h1' | 'm30' | 'm15' | 'm5';

export type Theme = 'dark' | 'light';

export type IUser = {
  twitterId: string;
  profile: Record<string, unknown>;
  token: string;
  tokenSecret: string;
};

export type Status =
  | 'idle'
  | 'pending'
  | 'receiving'
  | 'resolved'
  | 'rejected'
  | 'isCancelling'
  | 'cancelled';

export type TwitterApiResponse = {
  data: TweetV2[];
  includes: ApiV2Includes;
  meta: {
    newest_id: string;
    oldest_id: string;
    result_count: number;
    next_token?: string;
  };
};
