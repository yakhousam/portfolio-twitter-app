import { ChartData } from 'chart.js';
import { TweetV2, UserV2 } from 'twitter-api-v2';

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

export interface Statistics {
  original: number;
  replay: number;
  retweet: number;
  chartData: Array<string>;
}

export interface SearchHashtagReturnData extends Statistics {
  rateLimit: {
    limit: number;
    reset: number;
    remaining: number;
  };
  rankedAccounts: UserV2[];
  mostEngagedTweets: TweetV2[];
}
export interface ChartDataLine extends ChartData<'line'> {
  labels: Array<string>;
  datasets: Array<{ data: Array<number> }>;
}
