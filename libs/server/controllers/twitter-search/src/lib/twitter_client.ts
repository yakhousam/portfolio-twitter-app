import { TwitterApi } from 'twitter-api-v2';

export function getTwitterApiClient(accessToken: string, accessSecret: string) {
  let twitterApiClient: TwitterApi;

  if (process.env.NODE_ENV === 'test') {
    twitterApiClient = new TwitterApi(process.env.TWITTER_API_CLIENT);
  } else {
    twitterApiClient = new TwitterApi({
      appKey: process.env.TWITTER_CONSUMER_KEY,
      appSecret: process.env.TWITTER_CONSUMER_SECRET,
      accessToken,
      accessSecret,
    });
  }

  return twitterApiClient;
}
