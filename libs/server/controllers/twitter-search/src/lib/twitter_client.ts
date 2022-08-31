import { TwitterApi } from 'twitter-api-v2';

export function getTwitterApiClient(
  accessToken?: string,
  accessSecret?: string
) {
  let twitterApiClient: TwitterApi;

  if (process.env.NODE_ENV !== 'production') {
    twitterApiClient = new TwitterApi(process.env.TWITTER_API_CLIENT);
  } else {
    twitterApiClient = new TwitterApi({
      appKey: process.env.TWITTER_CLIENT_ID,
      appSecret: process.env.TWITTER_CLIENT_SECRET,
      accessToken,
      accessSecret,
    });
  }

  return twitterApiClient;
}
